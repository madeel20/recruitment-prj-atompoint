import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { firestore } from '../firebase';

export const MappedElement = ({ data, renderElement, count }) => {
    if (data && data.length) {
        return data.map((obj, index, array) => {
            if (count) {
                return (index <= count) ? renderElement(obj, index, array) : null
            } else {
                return renderElement(obj, index, array)
            }
        });
    }
    return null;
};

export function gup( name, url ) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

export const usePersistedState = (key, defaultValue) => {
    const [state, setState] = React.useState(
        () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}


export function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const checkUserExist = (user) => Object.entries(user).length > 0


export const sendConfirmationEmails = (fullName, email, key) => {
    let templateParams = {
        to_name: fullName,
        link_url: 'https://security-checkist.web.app?key=' + key,
        to_email: email,
    };


    // first send email to the user 
    emailjs.send('default_service', 'template_r2s2m2e', templateParams)
        .then(function (response) {
            console.log('Email sent to user!', response.status, response.text);

            let templateParams = {
                to_name: email,
                to_email: 'aliadeel20@gmail.com',
            };

            // also send email to the admin
            emailjs.send('default_service', 'template_pk5vwfl', templateParams)
                .then(function (response) {
                    console.log('Email Sent to admin!', response.status, response.text);
                }, function (err) {
                    console.log('FAILED...', err);
                });

        }, function (err) {
            console.log('FAILED...', err);
        });

}


export const checkUserVerification = (user,setUser,setUserVerified) =>{

    // first check if user exist or not
    if(checkUserExist(user)){
      return  firestore.collection('users').doc(user?.key).get().then(res=>{

            // if user exist then return and verify the user
            if(res.exists){
                setUserVerified(true);
                return;
            }
            else {
                setUserVerified(false);
                setUser({ });
                return;
            }

        }).catch((err)=>{
            console.log(err)
            setUserVerified(false);
            return;
        });

    }

    // now if user does not exist , check for veryify key param that was sent through email
    let keyFromUrl = gup('key');
    window.history.pushState(null, null, window.location.pathname);

    // check if the key param exist for verification
    if(keyFromUrl) {
            // verify key from firestore
            return  firestore.collection('users').doc(keyFromUrl).get().then(res=>{

                // if user exist then return and verify the user
                if(res.exists){
                    setUserVerified(true);
                    setUser({key: keyFromUrl });
                    return;
                }
                else {
                    setUserVerified(false);
                    setUser({ });
                    return;
                }
               
    
            }).catch((err)=>{
                console.log(err)
                setUserVerified(false);
                return;
            });
    }
    else {
        setUserVerified(false);
        return;
    }


}
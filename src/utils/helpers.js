import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

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
        link_url: 'https://security-checkist.web.app/key?' + key,
        to_email: email,
    };


    // first send email to the user 
    emailjs.send('default_service', 'template_r2s2m2e', templateParams)
        .then(function (response) {
            console.log('Email sent to user!', response.status, response.text);

            let templateParams = {
                to_name: email,
                link_url: 'https://security-checkist.web.app/key?' + key,
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
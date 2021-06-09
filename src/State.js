import { atom } from 'recoil';

export const events = atom({
    key: 'events',
    default: [{ message: "this is an empty log" }],
});

export const globalSocket = atom({
    key: 'globalSocket',
    default: null
})

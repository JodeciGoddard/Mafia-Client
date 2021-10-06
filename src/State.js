import { atom } from 'recoil';

export const events = atom({
    key: 'events',
    default: [{ message: "this is an empty log" }],
});

export const atomSocket = atom({
    key: 'atomSocket',
    default: null
});

export const roomData = atom({
    key: 'roomData',
    default: {},
    dangerouslyAllowMutability: true,
});

export const me = atom({
    key: 'me',
    default: { id: '', name: '' },
    dangerouslyAllowMutability: true
})

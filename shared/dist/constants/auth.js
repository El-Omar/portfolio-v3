"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH = void 0;
/** Auth cookie information, like key of the cookie and its options */
exports.AUTH = {
    KEY: "auth_token",
    OPTIONS: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
    },
};

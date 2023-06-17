import { JwtCookiePayload, JwtTokenPayload } from './interfaces';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

const JWT_COOKIE_NAME = 'jwt_auth_cookie';

class Cookie {
    readonly #cookies: Cookies;

    constructor() {
        this.#cookies = new Cookies();
    }

    setAuthCookie(token: string) {
        const decodedJwt = jwt<JwtTokenPayload>(token);
        const { exp, username } = decodedJwt;
        const cookiePayload = {
            token,
            username,
        };
        this.#cookies.set(JWT_COOKIE_NAME, cookiePayload, {
            expires: new Date(exp * 1000),
            sameSite: 'strict',
        });
        return this.checkAuthCookie();
    }

    getAuthCookie(): JwtCookiePayload {
        return this.#cookies.get(JWT_COOKIE_NAME);
    }

    checkAuthCookie() {
        return this.getAuthCookie() !== undefined;
    }

    removeAuthCookie() {
        this.#cookies.remove(JWT_COOKIE_NAME);
    }
}

export default Cookie;

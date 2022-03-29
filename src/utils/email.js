let API_URL = 'https://twgoodthing.io/api';

export default function () {
    async function send(email) {
        try {
            const payload = {
                email: email
            }
            let res = await fetch(`${API_URL}/api/email/send`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            });

            let data = await res.json();

            return data
        } catch (error) {
            return error;
        }
    }


    async function verify(email, token) {
        try {
            const payload = {
                email: email,
                token: token
            }
            let res = await fetch(`${API_URL}/api/email/verify`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            });

            let data = await res.json();

            return data
        } catch (error) {
            return error;
        }
    }

    return {
        verify,
        send
    }
}
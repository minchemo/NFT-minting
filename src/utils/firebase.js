import store from "@/store"
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
    getAuth,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    fetchSignInMethodsForEmail,
} from "firebase/auth"
import { useI18n } from "vue-i18n"

export default function() {
    const { t } = useI18n()

    const firebaseConfig = {
        apiKey: "AIzaSyDeVk8Qs0yPaP7KFdYheWmxuZto8fqe7X4",
        authDomain: "twgoodthing-a5029.firebaseapp.com",
        projectId: "twgoodthing-a5029",
        storageBucket: "twgoodthing-a5029.appspot.com",
        messagingSenderId: "914241157961",
        appId: "1:914241157961:web:21445e4e63126907527898",
        measurementId: "G-N8HH9FEE8T",
    }

    const initFirebase = () => {
        const app = initializeApp(firebaseConfig)
        const analytics = getAnalytics(app)

        store.dispatch("initFirebase", app)
    }

    async function verifyEmail(email) {
        const actionCodeSettings = {
            url: `http://dev.local/raffle?method=verify&email=${email}`,
            handleCodeInApp: true,
        }

        let success = true
        try {
            const auth = getAuth()
            await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        } catch (error) {
            success = false
        }

        return success
    }

    async function isSignIn(email) {
        const auth = getAuth()
        let providers = []
        try {
            providers = await fetchSignInMethodsForEmail(auth, email)
        } catch (error) {
            providers = []
        }
        return providers
    }

    async function signInEmail(email) {
        const auth = getAuth()
        let res
        try {
            const check = await isSignIn(email)
            if (check.indexOf("emailLink") >= 0) {
                res = t("raffle.msg7")
            } else {
                await signInWithEmailLink(auth, email, window.location.href)
                res = t("raffle.msg7")
            }
        } catch (error) {
            res = t("raffle.msg8")
        }

        return res
    }

    return {
        initFirebase,
        isSignIn,
        verifyEmail,
        signInEmail,
    }
}
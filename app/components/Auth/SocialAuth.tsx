"use client";

import { getGoogleOauthConsentUrl } from "@/app/authenticate/auth.actions";
const SocialAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-10">
      <h2 className="text-1xl font-bond text-center">Social Authentication</h2>
      <button
        className="btn btn-danger w-full max-w-lg m-2 bg-pink-600 text-lime-50"
        name="action"
        value="google"
        onClick={async () => {
          const res = await getGoogleOauthConsentUrl();
          if (res.url) {
            window.location.href = res.url;
          } else {
            console.log("Error getting google auth url");
          }
        }}
      >
        SignIn with Google
      </button>
      <button
        className="btn btn-success w-full max-w-lg m-2"
        name="action"
        value="github"
      >
        SignIn with Github
      </button>
    </div>
  );
};

export default SocialAuth;

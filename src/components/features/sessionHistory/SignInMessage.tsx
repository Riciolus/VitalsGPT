import Button from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInMessage = () => {
  return (
    <div className="h-fit">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Button
          onClick={() => signIn()}
          className="flex justify-center items-center gap-1 outline-none rounded-md border bg-lime-600 dark:bg-lime-800 hover:bg-lime-700/55 dark:hover:bg-lime-700/55 bg-opacity-25 dark:bg-opacity-55 p-1.5 text-xs transition-all duration-[50ms]"
        >
          <svg
            className="w-3 h-3 fill-neutral-600 dark:fill-foreground"
            height="28px"
            width="800px"
            viewBox="0 0 330 330"
            xmlSpace="preserve"
          >
            <g id="XMLID_486_">
              <path
                id="XMLID_487_"
                d="M165,330c63.411,0,115-51.589,115-115c0-29.771-11.373-56.936-30-77.379V85c0-46.869-38.131-85-85-85
                        S80.001,38.131,80.001,85v52.619C61.373,158.064,50,185.229,50,215C50,278.411,101.589,330,165,330z M180,219.986V240
                        c0,8.284-6.716,15-15,15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
                        C190,208.162,186.068,215.421,180,219.986z M110.001,85c0-30.327,24.673-55,54.999-55c30.327,0,55,24.673,55,55v29.029
                        C203.652,105.088,184.91,100,165,100c-19.909,0-38.651,5.088-54.999,14.028V85z"
              />
            </g>
          </svg>
          <span onClick={() => signIn()} className="text-neutral-600 dark:text-foreground ">
            Sign in to access history
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SignInMessage;

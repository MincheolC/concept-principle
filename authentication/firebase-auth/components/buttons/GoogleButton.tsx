import Image from "next/image";

// Google 로그인 브랜드 가이드라인: https://developers.google.com/identity/branding-guidelines?hl=ko
export default function GoogleButton({
  type,
  size = "medium",
  onClick,
}: {
  type: "signup" | "signin" | "continue";
  size: "small" | "medium" | "large";
  onClick: () => void;
}) {
  const buttonStyle = {
    small: {
      fontSize: "test-xs xl:text-sm",
      logoSize: 28,
    },
    medium: {
      fontSize: "text-sm xl:text-base",
      logoSize: 36,
    },
    large: {
      fontSize: "text-lg xl:text-xl",
      logoSize: 44,
    },
  }[size];

  const buttonContent = {
    signup: "Google 계정으로 가입하기",
    signin: "Google 계정으로 로그인",
    continue: "Google 계정으로 로그인",
  }[type];

  return (
    <div
      className={`flex justify-center items-center px-2 border border-slate-400 shadow-sm h-10 w-full rounded-lg cursor-pointer hover:bg-[#4285F4] hover:text-white
      ${buttonStyle.fontSize}
      `}
      onClick={onClick}
    >
      <Image
        src="/assets/social_logo/google_light.svg"
        width={buttonStyle.logoSize}
        height={buttonStyle.logoSize}
        alt="google-sign-up-btn"
      />
      <div className="pl-6">{buttonContent}</div>
    </div>
  );
}

import Image from "next/image";

export default function FacebookButton({
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
      logoSize: 20,
    },
    medium: {
      fontSize: "text-sm xl:text-base",
      logoSize: 24,
    },
    large: {
      fontSize: "text-lg xl:text-xl",
      logoSize: 28,
    },
  }[size];

  const buttonContent = {
    signup: "Facebook으로 가입하기",
    signin: "Facebook으로 로그인하기",
    continue: "Facebook으로 계속하기",
  }[type];

  return (
    <div
      className={`flex justify-center items-center px-2 border border-[#1877F2] shadow-sm h-10 w-full text-[#1877F2] rounded-lg cursor-pointer hover:bg-[#1877F2] hover:text-white
      ${buttonStyle.fontSize}
      `}
      onClick={onClick}
    >
      <Image
        src="/assets/social_logo/facebook_primary.png"
        width={buttonStyle.logoSize}
        height={buttonStyle.logoSize}
        alt="facebook-sign-up-btn"
      />
      <div className="pl-6">{buttonContent}</div>
    </div>
  );
}

import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Image src="/next.svg" alt="logo" width={130} height={130} />
    </div>
  );
};

export default Logo;

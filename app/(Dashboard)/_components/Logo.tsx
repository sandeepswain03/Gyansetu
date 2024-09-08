import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center justify-center   gap-x-2">
      <Image src="/logo.png" alt="logo" width={240} height={100} />
    </div>
  );
};

export default Logo;

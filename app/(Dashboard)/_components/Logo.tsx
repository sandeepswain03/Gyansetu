import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center justify-center   gap-x-2">
      <Link href={"/"}>
        <Image src="/logo.png" alt="logo" width={240} height={100} />
      </Link>
    </div>
  );
};

export default Logo;

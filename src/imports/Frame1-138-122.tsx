import imgProduct1 from "figma:asset/9b6402235aa9b4b943a308db1e260de4301b98c9.png";
import imgContact1 from "figma:asset/1f9349c42af860ae0b87695105a6bec7b2dc0522.png";
import imgCompany1 from "figma:asset/6e7b637854abb3da0b7ce6549924c83fe43b2682.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[654px] left-[1007px] top-[896px] w-[1154px]" data-name="product 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProduct1} />
      </div>
      <div className="absolute h-[616px] left-[1618px] top-[154px] w-[1086px]" data-name="contact 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContact1} />
      </div>
      <div className="absolute h-[756px] left-[243px] top-[105px] w-[1334px]" data-name="company 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCompany1} />
      </div>
    </div>
  );
}
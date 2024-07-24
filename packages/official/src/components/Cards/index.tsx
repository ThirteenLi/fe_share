import { ReactComponent as SvgP } from "/public/ic_permissionless.svg";
import { ReactComponent as SvgV } from "/public/ic_verify.svg";
import { ReactComponent as SvgC } from "/public/ic_community.svg";
export default function Cards() {
  const list = [
    {
      icon: <SvgP />,
      key: 1,
      title: "Permissionless",
      content: "Open network is made for everyone",
    },
    {
      icon: <SvgV />,
      key: 2,
      title: "Don't Trust, Verify",
      content: "The whole network relies on the transparent distributed ledger",
    },
    {
      icon: <SvgC />,
      key: 3,
      title: "Community Driven",
      content: "All improvement proposals will be voted by community",
    },
  ];

  return (
    <div className="lg:mt-[-72px] mt-[-50px] text-text-6 relative z-10">
      <div className="px-[60px] flex lg:flex-row flex-col items-center xl:gap-[40px] lg:pb-[50px]">
        {list.map(({ icon, key, title, content }) => (
          <div
            key={key}
            className="flex flex-col lg:flex-1 items-center justify-center lg:h-[224px] h-[184px] hover:bg-hoverLinearToB cursor-default hover:rounded-[12px] animate__fadeIn animate__animated wow"
          >
            <div className="mb-5">{icon}</div>
            <p className="font-400 lg:text-24 text-16 lg:leading-[36px] leading-[28px] text-center">{title}</p>
            <p className="mt-2 font-300 text-text-4 text-14 leading-[20px] text-center">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useLayoutEffect, useRef } from "react";
import videoUrl from "~/assets/videos/ani_world.mp4";
export default function World() {
  const videoRef = useRef(null);
  useLayoutEffect(() => {
    videoRef.current.playbackRate = 0.4;
  }, []);
  return (
    <div className="relative overflow-hidden flex justify-center">
      <video
        ref={videoRef}
        className="w-full min-w-[720px]"
        src={videoUrl}
        muted
        autoPlay
        controls={false}
        loop
      ></video>
      <div className="absolute lg:bottom-[174px] bottom-[92px] left-0 right-0 text-center lg:text-[60px] text-[30px] lg:leading-[66px] leading-[33px] font-500 text-text-6 wow animate__animated animate__fadeInUp">
        Decentralized
      </div>
    </div>
  );
}

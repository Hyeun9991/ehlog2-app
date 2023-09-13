import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="flex w-full gap-2">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=1180206992856877&display=popup&href=${url}`}
        className="bg-bgColor-dark w-[28px] h-[28px] rounded-full flex items-center justify-center hover:scale-110 transition-all"
      >
        <FaFacebookF className="text-textColor-dark" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
        className="bg-bgColor-dark w-[28px] h-[28px] rounded-full flex items-center justify-center hover:scale-110 transition-all"
      >
        <FaTwitter className="text-textColor-dark" />
      </a>
    </div>
  );
};

export default SocialShareButtons;

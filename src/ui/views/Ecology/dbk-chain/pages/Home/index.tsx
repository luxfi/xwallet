import React from 'react';
import { DbkButton } from '../../components/DbkButton';
import exchangeImg from '@/ui/assets/ecology/exchange.png';
import marketImg from '@/ui/assets/ecology/market.png';
import creditImg from '@/ui/assets/ecology/credit.png';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export const DbkChainHome = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  return (
    <div className="px-[20px] py-[40px] flex flex-col gap-[28px]">
      <div
        className="rounded-[8px] bg-[#ffffff24] p-[20px] relative cursor-pointer"
        style={{ boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.08)' }}
        onClick={() => {
          // console.log(`Navigating to: ${url}/bridge`); // Debugging log
          // history.push(`${url}/bridge`);
          window.open('https://lux.exchange');
        }}
      >
        <div className="text-[white] font-semibold text-[20px] leading-[22px] mb-[5px]">
          {t('page.ecology.luxEco.home.exchange')}
        </div>
        <div className="text-[#ffffff6e] text-[13px] leading-[14px] mb-[20px]">
          {t('page.ecology.luxEco.home.exchangePoweredBy')}
        </div>
        <DbkButton className="w-[100px]">
          {t('page.ecology.luxEco.home.exchangeBtn')}
        </DbkButton>
        <img
          src={exchangeImg}
          alt=""
          className="absolute bottom-[18px] right-[12px] opacity-70"
        />
      </div>
      <div
        className="rounded-[8px] bg-[#ffffff24] p-[20px] relative cursor-pointer"
        style={{ boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.08)' }}
        onClick={() => {
          // console.log(`Navigating to: ${url}/mintNft`); // Debugging log
          // history.push(`${url}/mintNft`);
          window.open('https://lux.market');
        }}
      >
        <div className="text-[white] font-semibold text-[20px] leading-[22px] mb-[5px]">
          {t('page.ecology.luxEco.home.mintNFT')}
        </div>
        <div className="text-[#ffffff6e] text-[13px] leading-[14px] mb-[20px]">
          {t('page.ecology.luxEco.home.mintNFTDesc')}
        </div>
        <DbkButton className="w-[100px]">
          {t('page.ecology.luxEco.home.mintNFTBtn')}
        </DbkButton>
        <img
          src={marketImg}
          alt=""
          className="absolute bottom-[12px] right-[12px] opacity-70"
        />
      </div>
      <div
        className="rounded-[8px] bg-[#ffffff24] p-[20px] relative cursor-pointer"
        style={{ boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.08)' }}
        onClick={() => {
          // console.log(`Navigating to: ${url}/mintNft`); // Debugging log
          // history.push(`${url}/mintNft`);
          window.open('https://lux.credit');
        }}
      >
        <div className="text-[white] font-semibold text-[20px] leading-[22px] mb-[5px]">
          {t('page.ecology.luxEco.home.credit')}
        </div>
        <div className="text-[#ffffff6e] text-[13px] leading-[14px] mb-[20px]">
          {t('page.ecology.luxEco.home.creditDoc')}
        </div>
        <DbkButton className="w-[100px]">
          {t('page.ecology.luxEco.home.creditBtn')}
        </DbkButton>
        <img
          src={creditImg}
          alt=""
          className="absolute bottom-[12px] right-[12px] opacity-70"
        />
      </div>
    </div>
  );
};

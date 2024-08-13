import { findChain } from '@/utils/chain';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ReactComponent as RcIconBack } from 'ui/assets/icon-back-cc.svg';
import LuxIcon from '@/ui/assets/ecology/dbk-genesis-nft.png';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  chainId: number;
}
export const EcologyNavBar = ({ className, style, chainId }: Props) => {
  const chain = useMemo(
    () =>
      findChain({
        id: chainId,
      }),
    [chainId]
  );
  const history = useHistory();

  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        'flex items-center px-[20px] py-[10px] min-h-[48px]',
        'border-b-[0.5px]',
        'bg-r-neutral-bg1',
        className
      )}
      style={style}
    >
      <div className="flex-1">
        <RcIconBack
          className="cursor-pointer text-r-neutral-title1 text-[white]"
          onClick={() => {
            if (history.length > 1) {
              history.goBack();
            } else {
              history.replace('/');
            }
          }}
        ></RcIconBack>
      </div>
      <div className="flex-auto">
        <div className="flex items-center justify-center bg-r-neutral-card2 rounded-full p-[6px] gap-[6px]">
          {/* <img src={LuxIcon} alt="luxicon" className="w-[20px] h-[20px]" /> */}
          <div className="text-neutral-body text-[20px] leading-[22px] text-r-neutral-body font-bold text-[white]">
            {/* {t('component.EcologyNavBar.providedBy', {
              chainName: chain?.name,
            })} */}
            Provided by LUX Chain
          </div>
        </div>
      </div>
      <div className="flex-1 text-right"></div>
    </div>
  );
};

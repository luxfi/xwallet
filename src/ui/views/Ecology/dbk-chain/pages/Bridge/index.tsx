import React, { useMemo } from 'react';

import { ReactComponent as RcIconArrow } from '@/ui/assets/ecology/icon-arrow-right-cc.svg';
import { ReactComponent as RcIconHistory } from '@/ui/assets/ecology/icon-history-cc.svg';
import { NameAndAddress } from '@/ui/component';
import { formatAmount, formatUsdValue } from '@/ui/utils';
import { getTokenSymbol } from '@/ui/utils/token';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import styled from 'styled-components';
import { DbkButton } from '../../components/DbkButton';
import { ActivityPopup } from './components/ActivityPopup';
import { WithdrawConfirmPopup } from './components/WithdrawConfirmPopup';
import { useDbkChainBridge } from './hooks/useDbkChainBridge';
import { useInterval, useMemoizedFn } from 'ahooks';
import { InfoCircleFilled } from '@ant-design/icons';
import { useCreateViemClient } from './hooks/useCreateViemClient';
import { useQueryDbkBridgeHistory } from './hooks/useQueryDbkBridgeHistory';
import { useCheckBridgeStatus } from './hooks/useCheckBridgeStatus';
import { useTranslation } from 'react-i18next';
import { sortBy } from 'lodash';

const Warper = styled.div`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
  .ant-input {
    border: none !important;
    background: transparent !important;
    font-size: 28px;
    line-height: 34px;
    color: var(--r-neutral-title1, #192945);
    font-weight: 700;
    padding: 0;
  }
`;

export const DbkChainBridge = () => {
  const [isShowActivityPopup, setIsShowActivityPopup] = React.useState(false);
  const [
    isShowWithdrawConfirmPopup,
    setIsShowWithdrawConfirmPopup,
  ] = React.useState(false);

  const { t } = useTranslation();

  const { clientL1, clientL2 } = useCreateViemClient();

  const {
    data: bridgeHistory,
    loadMore: loadMoreHistory,
  } = useQueryDbkBridgeHistory();

  const {
    data: statusRes,
    refreshAsync: runCheckBridgeStatus,
  } = useCheckBridgeStatus({
    clientL1,
    clientL2,
    list: bridgeHistory?.list || [],
  });

  const historyList = useMemo(() => {
    const list = bridgeHistory?.list || [];
    const dict = statusRes?.dict || {};
    return sortBy(
      list,
      (item) => {
        const key = `${item.from_chain_id}:${item.tx_id}`;
        const status = dict[key]?.status;
        const isPending = status !== 'finalized';
        return isPending ? 0 : 1;
      },
      (item) => -item.create_at
    );
  }, [bridgeHistory?.list, statusRes?.dict]);

  useInterval(
    () => {
      runCheckBridgeStatus();
    },
    30 * 1000,
    { immediate: false }
  );

  const tabs = [
    {
      key: 'deposit' as const,
      label: t('page.ecology.luxEco.bridge.tabs.deposit'),
    },
    {
      key: 'withdraw' as const,
      label: t('page.ecology.luxEco.bridge.tabs.withdraw'),
    },
  ];
  const [activeTab, setActiveTab] = React.useState<'deposit' | 'withdraw'>(
    'deposit'
  );

  const {
    fromChain,
    targetChain,
    payAmount,
    setPayAmount,
    payToken,
    extraInfo,
    handleDeposit,
    handleWithdraw,
    handleWithdrawStep,
    isDepositSubmitting,
    isWithdrawSubmitting,
    withdrawFinalizeGasFee,
    withdrawGasFee1,
    withdrawProveGasFee,
  } = useDbkChainBridge({ action: activeTab, clientL1, clientL2 });

  const handleSubmit = useMemoizedFn(() => {
    if (activeTab === 'deposit') {
      handleDeposit();
    } else {
      setIsShowWithdrawConfirmPopup(true);
    }
  });

  return (
    <Warper className="bg-[black]">
      <div className="p-[20px]">
        <div className="rounded-[8px] bg-[#ffffff24] px-[16px] pt-[20px] pb-[16px]">
          <div className="flex justify-center mb-[16px] relative">
            <div className="inline-flex items-center bg-[black] rounded-full p-[5px]">
              {tabs.map((item) => {
                const isActive = item.key === activeTab;
                return (
                  <div
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key);
                    }}
                    className={clsx(
                      'rounded-full min-h-[28px] min-w-[108px] cursor-pointer',
                      'p-[6px] text-center',
                      'text-[13px] leading-[16px]  font-bold ',
                      isActive
                        ? 'bg-white text-[black] shadow-lg'
                        : 'text-[white]'
                    )}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
            <div
              className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer text-white"
              onClick={() => {
                setIsShowActivityPopup(true);
              }}
            >
              {statusRes?.pendingCount ? (
                <div className="text-white relative cursor-pointer">
                  <Loading3QuartersOutlined className="text-[18px] animate-spin block" />
                  <div className="text-[13px] leading-[13px] absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                    {statusRes.pendingCount}
                  </div>
                </div>
              ) : (
                <RcIconHistory />
              )}
            </div>
          </div>
          <div className="rounded-[8px] border-[0.5px] border-[#545454] p-[12px] flex items-center justify-between mb-[16px]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[8px]">
                <img
                  src={fromChain?.logo}
                  alt=""
                  className="w-[28px] h-[28px]"
                />
                <div className="min-w-0">
                  <div className="text-[12px] leading-[14px] font-medium text-white mb-[2px]">
                    {t('page.ecology.luxEco.bridge.labelFrom')}
                  </div>
                  <div className="text-[15px] leading-[18px] font-bold truncate text-white">
                    {fromChain?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white flex-shrink-0">
              <RcIconArrow />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-end gap-[8px]">
                <img
                  src={targetChain?.logo}
                  alt=""
                  className="w-[28px] h-[28px]"
                />
                <div className="min-w-0">
                  <div className="text-[12px] leading-[14px] font-medium text-white mb-[2px]">
                    {t('page.ecology.luxEco.bridge.labelTo')}
                  </div>
                  <div className="text-[15px] leading-[18px] font-bold truncate text-white">
                    {targetChain?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              'rounded-[8px] bg-r-neutral-card-2 p-[12px] mb-[16px]',
              'border-[1px] border-[#545454]'
            )}
          >
            <div className="flex items-center justify-between mb-[4px] gap-[6px]">
              <Input
                type="number"
                value={payAmount}
                onChange={(e) => {
                  const v = e.target.value;
                  if (!/^\d*(\.\d*)?$/.test(v)) {
                    return;
                  }
                  setPayAmount(v);
                }}
                className="min-w-0 flex-1 text-white"
                autoFocus
                placeholder="0"
              ></Input>
              {payToken ? (
                <div className="flex items-center gap-[8px]">
                  <img
                    src={payToken?.logo_url}
                    alt=""
                    className="w-[18px] h-[18px]"
                  />
                  <div className="text-white text-[15px] leading-[18px] font-bold">
                    {payToken ? getTokenSymbol(payToken) : ''}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[#fff] opacity-80 text-[13px] leading-[16px] font-medium min-w-0 truncate">
                {payAmount
                  ? `${formatUsdValue(
                      new BigNumber(payAmount)
                        .times(payToken?.price || 0)
                        .toString(10)
                    )}`
                  : ''}
              </div>
              <div
                className="text-[#fff] opacity-80 text-[13px] leading-[16px] font-medium underline cursor-pointer min-w-0 truncate"
                onClick={() => {
                  setPayAmount(
                    new BigNumber(payToken?.raw_amount_hex_str || 0)
                      .div(
                        new BigNumber(10).exponentiatedBy(
                          payToken?.decimals || 18
                        )
                      )
                      .toString()
                  );
                }}
              >
                {t('global.Balance')}: {formatAmount(payToken?.amount || 0)}
              </div>
            </div>
          </div>
          <div className="rounded-[8px] border-[0.5px] border-[#545454] p-[12px]">
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="text-[13px] text-white leading-[16px] flex-shrink-0">
                  {t('page.ecology.luxEco.bridge.info.toAddress')}
                </div>
                <div className="ml-auto min-w-0">
                  <NameAndAddress
                    nameClass="text-[13px] leading-[16px] font-semibold text-white"
                    addressClass="text-[13px] leading-[16px]"
                    address={extraInfo.toAddress || ''}
                    copyIcon={false}
                  ></NameAndAddress>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="text-[13px] text-white leading-[16px] flex-shrink-0">
                  {t('page.ecology.luxEco.bridge.info.receiveOn', {
                    chainName: targetChain?.name,
                  })}
                </div>
                <div className="ml-auto  min-w-0">
                  <div className="text-[13px] leading-[16px] text-white font-semibold">
                    {formatAmount(extraInfo.receiveAmount || 0)}{' '}
                    {extraInfo.receiveTokenSymbol}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="text-[13px] text-white leading-[16px] flex-shrink-0">
                  {t('page.ecology.luxEco.bridge.info.completeTime')}
                </div>
                <div className="ml-auto  min-w-0">
                  <div className="text-[13px] leading-[16px] text-white font-semibold truncate">
                    {extraInfo.completeTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="text-[13px] text-white leading-[16px flex-shrink-0]">
                  {t('page.ecology.luxEco.bridge.info.gasFee')}
                </div>
                <div className="ml-auto min-w-0">
                  <div className="text-[13px] leading-[16px] text-white font-semibold truncate">
                    {extraInfo.gasFee != null
                      ? formatUsdValue(extraInfo.gasFee)
                      : '--'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {+payAmount > (payToken?.amount || 0) ? (
          <div className="flex items-center gap-[4px] mt-[12px]">
            <InfoCircleFilled
              className={clsx(
                'self-start transform rotate-180 origin-center text-[16px]',
                'text-r-red-default'
              )}
            />

            <div className="text-r-red-default font-medium text-[13px] leading-[16px]">
              {t('page.ecology.luxEco.bridge.error.notEnoughBalance')}
            </div>
          </div>
        ) : null}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 px-[20px] py-[18px] border-t-[0.5px] border-[#545454]">
        <DbkButton
          className="w-full h-[44px]"
          onClick={handleSubmit}
          disabled={
            (+payAmount || 0) <= 0 || +payAmount > (payToken?.amount || 0)
          }
          loading={isDepositSubmitting || isWithdrawSubmitting}
        >
          {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
        </DbkButton>
      </footer>
      <ActivityPopup
        data={historyList || []}
        statusDict={statusRes?.dict || {}}
        visible={isShowActivityPopup}
        onWithdrawStep={handleWithdrawStep}
        onClose={() => {
          setIsShowActivityPopup(false);
        }}
        loadMore={loadMoreHistory}
      />
      <WithdrawConfirmPopup
        visible={isShowWithdrawConfirmPopup}
        gasFees={{
          withdrawFinalizeGasFee,
          withdrawGasFee1,
          withdrawProveGasFee,
        }}
        onClose={() => {
          setIsShowWithdrawConfirmPopup(false);
        }}
        onSubmit={() => {
          setIsShowWithdrawConfirmPopup(false);
          handleWithdraw();
        }}
      />
    </Warper>
  );
};

import { useLuxSelector } from '@/ui/store';
import { useWallet } from '@/ui/utils';
import { useState } from 'react';
import { useAsync } from 'react-use';

const useRefresh = () => {
  const [v, setV] = useState(0);
  return [v, () => setV((e) => e + 1)] as const;
};

export const useLuxPoints = () => {
  const wallet = useWallet();
  const account = useLuxSelector((state) => state.account.currentAccount);
  const [userPointsCount, refreshUserPoints] = useRefresh();
  const [activitiesCount, refreshActivities] = useRefresh();
  const [topUsersCount, refreshTopUsers] = useRefresh();

  const {
    value: campaignIsEnded,
    loading: campaignIsEndedLoading,
  } = useAsync(async () => {
    if (account?.address) {
      const data = await wallet.openapi.getLuxPointsCampaignIsEndedV2();
      return data?.campaign_is_ended;
    }
    return;
  }, [account?.address]);

  const { value: signature, loading: signatureLoading } = useAsync(async () => {
    if (account?.address) {
      const data = await wallet.getLuxPointsSignature(account?.address);
      return data;
    }
    return;
  }, [account?.address]);

  const { value: snapshot, loading: snapshotLoading } = useAsync(async () => {
    if (account?.address) {
      const data = await wallet.openapi.getLuxPointsSnapshotV2({
        id: account?.address,
      });
      return data;
    }
    return;
  }, [account?.address]);

  const {
    value: userPointsDetail,
    loading: userLoading,
  } = useAsync(async () => {
    if (account?.address) {
      const data = await wallet.openapi.getLuxPointsV2({
        id: account?.address,
      });
      return data;
    }
    return undefined;
  }, [account?.address, userPointsCount]);

  const { value: topUsers, loading: topUsersLoading } = useAsync(async () => {
    if (account?.address) {
      const data = await wallet.openapi.getLuxPointsTopUsersV2({
        id: account?.address,
      });
      return data;
    }
    return undefined;
  }, [account?.address, topUsersCount]);

  const {
    value: activities,
    loading: activitiesLoading,
  } = useAsync(async () => {
    if (account?.address) {
      const data = await wallet.openapi.getLuxPointsListV2({
        id: account?.address,
      });
      return data;
    }
    return undefined;
  }, [account?.address, activitiesCount]);

  return {
    campaignIsEnded,
    campaignIsEndedLoading,
    signature,
    signatureLoading,
    snapshot,
    snapshotLoading,
    userPointsDetail,
    userLoading,
    topUsers,
    topUsersLoading,
    activities,
    activitiesLoading,
    refreshUserPoints,
    refreshActivities,
    refreshTopUsers,
  };
};

export const useLuxPointsInvitedCodeCheck = (invitedCode?: string) => {
  const wallet = useWallet();
  const account = useLuxSelector((state) => state.account.currentAccount);

  const { value: codeStatus, loading: codeLoading } = useAsync(async () => {
    if (invitedCode && account?.address) {
      const data = await wallet.openapi.checkLuxPointsInviteCodeV2({
        code: invitedCode,
      });
      return data;
    }
    return;
  }, [invitedCode, account?.address]);
  return {
    codeStatus,
    codeLoading,
  };
};

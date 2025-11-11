import { create } from "zustand";

interface SidebarState {
  mobileOpen: boolean;
  authModalOpen: boolean;
  vipProgressModalOpen: boolean;
  statisticModalOpen: boolean;
  walletSetupModalOpen: boolean;
  campaignFilterModalOpen: boolean;
  commissionFilterModalOpen: boolean;
  campaignDownloadModalOpen: boolean;
  addCampaignModalOpen: boolean;
  weeklyRaffleModalOpen: boolean;
  ticketModalOpen: boolean;
  hundredRaceModalOpen: boolean;
  transferBalanceModalOpen: boolean;
  walletOpenModalOpen: boolean;
  browseOpen: boolean;
  routeLoading: boolean;
  tabLoading: boolean;
  sideTabLoading: boolean;

  pageTabOpen: boolean;
  collapsed: boolean;
  forgetPasswordModalOpen: boolean;
  hovered: boolean;
  toggleMobileOpen: () => void;
  toggleAuthModalOpen: () => void;
  toggleVipProgressModalOpen: () => void;
  toggleStatisticModalOpen: () => void;
  toggleWalletSetupModalOpen: () => void;
  toggleCampaignFilterModalOpen: () => void;
  toggleCommissionFilterModalOpen: () => void;
  toggleCampaignDownloadModalOpen: () => void;
  toggleAddCampaignModalOpen: () => void;
  toggleWeeklyRaffleModalOpen: () => void;
  toggleTicketModalOpen: () => void;
  toggleHundredRaceModalOpen: () => void;
  toggleTransferBalanceModalOpen: () => void;
  toggleWalletOpenModalOpen: () => void;
  setWalletOpenModalOpen: (value: boolean) => void;
  setBrowseOpen: (value: boolean) => void;
  toggleBrowseOpen: () => void;
  togglePageTabOpen: () => void;
  setPageTabOpen: (value: boolean) => void;
  toggleCollapsed: () => void;
  toggleForgetPasswordModalOpen: () => void;
  setHovered: (value: boolean) => void;
  setRouteLoading: (value: boolean) => void;
  setTabLoading: (value: boolean) => void;
  setSideTabLoading: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  mobileOpen: false,
  authModalOpen: false,
  vipProgressModalOpen: false,
  statisticModalOpen: false,
  walletSetupModalOpen: false,
  campaignFilterModalOpen: false,
  commissionFilterModalOpen: false,
  campaignDownloadModalOpen: false,
  addCampaignModalOpen: false,
  weeklyRaffleModalOpen: false,
  ticketModalOpen: false,
  hundredRaceModalOpen: false,
  transferBalanceModalOpen: false,
  walletOpenModalOpen: false,
  browseOpen: false,
  pageTabOpen: false,
  collapsed: false,
  forgetPasswordModalOpen: false,
  hovered: false,
  routeLoading: false,
  tabLoading: false,
  sideTabLoading: false,

  toggleMobileOpen: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
  setBrowseOpen: (value: boolean) => set({ browseOpen: value }),
  toggleAuthModalOpen: () =>
    set((state) => ({ authModalOpen: !state.authModalOpen })),
  toggleVipProgressModalOpen: () =>
    set((state) => ({ vipProgressModalOpen: !state.vipProgressModalOpen })),
  toggleStatisticModalOpen: () =>
    set((state) => ({ statisticModalOpen: !state.statisticModalOpen })),
  toggleWalletSetupModalOpen: () =>
    set((state) => ({ walletSetupModalOpen: !state.walletSetupModalOpen })),
  toggleCampaignFilterModalOpen: () =>
    set((state) => ({ campaignFilterModalOpen: !state.campaignFilterModalOpen })),
  toggleCommissionFilterModalOpen: () =>
    set((state) => ({ commissionFilterModalOpen: !state.commissionFilterModalOpen })),
  toggleCampaignDownloadModalOpen: () =>
    set((state) => ({ campaignDownloadModalOpen: !state.campaignDownloadModalOpen })),
  toggleAddCampaignModalOpen: () =>
    set((state) => ({ addCampaignModalOpen: !state.addCampaignModalOpen })),
  toggleWeeklyRaffleModalOpen: () =>
    set((state) => ({ weeklyRaffleModalOpen: !state.weeklyRaffleModalOpen })),
  toggleTicketModalOpen: () =>
    set((state) => ({ ticketModalOpen: !state.ticketModalOpen })),
  toggleHundredRaceModalOpen: () =>
    set((state) => ({ hundredRaceModalOpen: !state.hundredRaceModalOpen })),
  toggleTransferBalanceModalOpen: () =>
    set((state) => ({ transferBalanceModalOpen: !state.transferBalanceModalOpen })),
  toggleWalletOpenModalOpen: () =>
    set((state) => ({ walletOpenModalOpen: !state.walletOpenModalOpen })),
  setWalletOpenModalOpen: (value: boolean) =>
    set({ walletOpenModalOpen: value }),
  toggleBrowseOpen: () => set((state) => ({ browseOpen: !state.browseOpen })),
  togglePageTabOpen: () =>
    set((state) => ({ pageTabOpen: !state.pageTabOpen })),
  setPageTabOpen: (value: boolean) => set({ pageTabOpen: value }), // NEW: setter
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  toggleForgetPasswordModalOpen: () =>
    set((state) => ({
      forgetPasswordModalOpen: !state.forgetPasswordModalOpen,
    })),

  setHovered: (value: boolean) => set({ hovered: value }),
  setRouteLoading: (value) => set({ routeLoading: value }),
  setTabLoading: (value) => set({ tabLoading: value }),
  setSideTabLoading: (value) => set({ sideTabLoading: value }),
}));

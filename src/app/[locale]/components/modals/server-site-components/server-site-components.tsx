import React from "react";
import HundredRaceModal from "../promotions/hundred-race-modal";
import TicketModal from "../promotions/ticket-modal";
import WeeklyRaffleModal from "../promotions/weekly-raffle-modal";
import StatisticsModal from "../statistic-flow/statistic-modal";
import VipProgressModal from "../vip-progress-flow/vip-progress-modal";

function ServerSiteComponents() {
  return (
    <div>
      {/* 75k Race modal */}
      <WeeklyRaffleModal />
      {/* 100k Race modal */}
      <HundredRaceModal />
      {/* ticket modal */}
      <TicketModal />
      {/* statistic modal */}
      <StatisticsModal />
      {/* vip progress modal */}
      <VipProgressModal />
    </div>
  );
}

export default ServerSiteComponents;

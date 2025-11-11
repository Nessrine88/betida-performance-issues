import PointerSVG from "../pointer-svg";
import { BinanceSVG, BitcoinSVG, EthereumSVG } from "./crypto-coins";

type CryptoType = "bitcoin" | "ethereum" | "binance" | "default";

const iconMap: Record<CryptoType, React.FC> = {
  bitcoin: BitcoinSVG,
  ethereum: EthereumSVG,
  binance: BinanceSVG,
  default: PointerSVG,
};

export default function CryptoIcon({ type }: { type: CryptoType }) {
  const Icon = iconMap[type] || iconMap.default;
  return <Icon />;
}

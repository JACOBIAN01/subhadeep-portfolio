// Maps the ids used by { t: "diagram" } / { t: "demo" } blocks in post content
// to the components that draw them. Add an entry here when a post needs a new figure.
import Wallets from "./diagrams/Wallets";
import Deputy from "./diagrams/Deputy";
import Freeze from "./diagrams/Freeze";
import WithdrawalDesk from "./demos/WithdrawalDesk";

export const FIGURES = {
  wallets: Wallets,
  deputy: Deputy,
  freeze: Freeze,
  desk: WithdrawalDesk,
};

export const getFigure = (id) => FIGURES[id] || null;

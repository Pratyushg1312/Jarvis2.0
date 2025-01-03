import { TreasureChest } from "@phosphor-icons/react";
import React from "react";

const InventorySidebarLinks = () => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="#">
        <i>
          <TreasureChest weight="duotone" />
        </i>
        <h5>Inventory</h5>
      </a>
    </li>
  );
};

export default InventorySidebarLinks;

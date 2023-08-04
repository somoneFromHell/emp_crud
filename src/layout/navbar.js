import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const navList = [
  {_id:"0001", path: "", name: "dashboard" },
  {_id:"0002",path: "department", name: "department" },
  {_id:"0003", path: "Employee", name: "employee" },
];

function NavBar() {
  let navigate = useNavigate();
  const [activeItem, setState] = useState("dashboard");

  return (
    <div>
      <Menu pointing secondary>
        {navList.map((item) => (
          <Menu.Item
            key={item._id}
            name={item.name}
            active={activeItem === item.name}
            onClick={() => {
              navigate(item.path);
              setState( item.name);
            }}
          />
        ))}
      </Menu>
    </div>
  );
}

export default NavBar;

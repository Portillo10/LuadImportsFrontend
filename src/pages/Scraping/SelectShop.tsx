import { memo, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useScraping } from "../../hooks/useScraping";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user";
import Accordeon from "../../components/Accordeon/Accordeon";
import Spinner from "../../components/Spinner/Spinner";
import { useSideBarStore } from "../../store/MenuStore";

const SelectAccordeon: React.FC<{ users: IUser[] }> = memo(({ users }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleClickUser = (index: number) => {
    if (index != selectedIndex) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(null);
    }
  };

  const handleClickShop = (store_id: string) => {
    navigate(`/scraping/${store_id}`);
  };

  return users.map((user, i) =>
    user.stores.length > 0 ? (
      <Accordeon
        key={user._id}
        displayed={selectedIndex == i}
        label={user.username}
        onClick={() => handleClickUser(i)}
      >
        {user.stores.map((store) => (
          <button
            key={store._id}
            className="w-full bg-[#414249] py-2 text-left px-6 hover:bg-zinc-800"
            onClick={() => handleClickShop(store._id)}
          >
            {store.alias}
          </button>
        ))}
      </Accordeon>
    ) : (
      <></>
    )
  );
});

const SelectShop: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { getUsers } = useAuth();
  const { getScrapingProgress } = useScraping();

  const navigate = useNavigate();
  const { setCurrentIndexPage } = useSideBarStore();

  useEffect(() => {
    setCurrentIndexPage(pageIndex || 5);

    (async () => {
      const progress = await getScrapingProgress();
      if (
        progress?.scrapingProgress.status == "running" &&
        progress?.scrapingProgress.targetStore
      ) {
        navigate(`/scraping/${progress?.scrapingProgress.targetStore}`);
      } else {
        const response = await getUsers();
        if (response) {
          setUsers(response);
        }
      }
    })();
  }, []);

  return (
    <div className="basicContainer px-6">
      <span className="titlePageContainer">
        <h2>Seleccione una tienda</h2>
      </span>
      <div className="flex flex-col w-4/5 mt-8">
        {users.length > 0 ? (
          <SelectAccordeon users={users} />
        ) : (
          <div className="w-full flex justify-center pt-14">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectShop;

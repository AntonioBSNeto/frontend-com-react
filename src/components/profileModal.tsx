import {
  HiBriefcase,
  HiMail,
  HiOutlineLogout,
  HiOutlineX,
  HiUser,
} from "react-icons/hi";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
  dataUser: {
    nameCollaborator: string;
    roleCollaborator: string;
    emailCollaborator: string;
    pictureCollaborator: string;
  };
  onClose: () => void;
}

export const ProfileModal = ({ dataUser, onClose }: ProfileModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const logout = async () => {
    try {
      dispatch(logOut())
      toast.info('Logout realizado!')
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55 p-4">
      <div className="border bg-white w-[400px] max-h-[95vh] rounded-lg flex flex-col scroll-m-0">
        <div className="flex items-center justify-between border-b pl-5 pr-3 py-2">
          <div>
            <h3 className="font-semibold">Perfil</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[19px] hover:bg-gray-200 rounded-full p-1"
          >
            <HiOutlineX />
          </button>
        </div>

        <div className="flex-grow px-5">
          <div className="flex flex-col items-center space-y-4 my-3">
            <div className="relative">
              <img
                src={dataUser.pictureCollaborator}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-center">
                {dataUser.nameCollaborator}
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-2 h-full px-5">
            {[
              { label: 'Nome completo', value: dataUser.nameCollaborator, icon: HiUser },
              { label: 'Cargo', value: dataUser.roleCollaborator, icon: HiBriefcase },
              { label: 'Email', value: dataUser.emailCollaborator, icon: HiMail },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <div className="rounded-lg h-10 border-2 border-gray-300 mt-1 flex items-center space-x-5">
                  <Icon className="text-blue-regular text-[20px] border-r-2 w-14" />
                  <p className="text-sm font-medium text-gray-600">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 px-10">
          <button onClick={logout} className="w-full hover:bg-black hover:text-white h-10 flex items-center justify-center rounded-lg border-black border-2 text-black p-5 gap-2">
            <HiOutlineLogout className="text-2xl" />
            <p>Sair da conta</p>
          </button>
        </div>
      </div>
    </div>
  );
};

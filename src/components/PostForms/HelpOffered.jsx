import AddProductForm from "../Products/AddProductForm";
import helpIcon from "../../assets/images/help.png";
const HelpOffered = ({ setShowAttachment }) => {
  return (
    <>
      <div>
        <AddProductForm setShowAttachment={setShowAttachment} icon={helpIcon} />
      </div>
    </>
  );
};

export default HelpOffered;

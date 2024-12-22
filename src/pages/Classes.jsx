import BreadCrumb from "../components/BreadCrumb";
import ClassesSection from "../components/ClassesSection";
import ClassesTimeTable from "../components/ClassesTimeTable";

const Classes = () => {
  return (
    <>
      <BreadCrumb title="Classes" />
      <ClassesSection />
      <ClassesTimeTable />
    </>
  );
};

export default Classes;

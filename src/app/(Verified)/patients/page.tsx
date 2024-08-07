import Text from "@/components/text/TopText";
import Rows from "@/components/rows/Rows";
import { authOptions } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";

const Patients = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>
        <Text ml="22.55px">Patient Register</Text>
        <Rows email={session?.user?.email} />
      </div>
    </>
  );
};

export default Patients;

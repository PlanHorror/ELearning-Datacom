import CustomerComponent from "../../../components/customer.component.tsx/customer.component";

const CustomerPage = ({ id }: { id: string }) => {
  return <CustomerComponent id={id} />;
};
export default CustomerPage;

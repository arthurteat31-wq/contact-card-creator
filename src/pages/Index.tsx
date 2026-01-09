import { ContactList } from "@/components/contacts/ContactList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 p-6">
      <div className="max-w-md mx-auto h-[85vh]">
        <ContactList />
      </div>
    </div>
  );
};

export default Index;

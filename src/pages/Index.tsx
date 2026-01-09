import { ContactList } from "@/components/contacts/ContactList";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <ContactList />
      </div>
    </div>
  );
};

export default Index;

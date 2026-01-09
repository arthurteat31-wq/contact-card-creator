import { ContactList } from "@/components/contacts/ContactList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto h-screen shadow-lg">
        <ContactList />
      </div>
    </div>
  );
};

export default Index;

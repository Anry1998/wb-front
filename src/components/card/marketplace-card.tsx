import { Marketplace } from "@/types/company.interface";
import CompanyCardAvatar from "../card-avatar/company-card-avatar";
import DeleteAlert from "../modals/delete-alert/delete-alert";
import MarketplaceForm from "../modals/marketplace-forms/marketplace-form";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";

type MarketplaceCardProps = {
  marketplace: Marketplace;
};
function MarketplaceCard({ marketplace }: MarketplaceCardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const { id, marketplace_name } = marketplace;
  return (
    <>
      <MarketplaceForm
        open={open}
        setOpen={setOpen}
        type="edit"
        marketplace={marketplace}
      />
      <Card className="group relative">
        <div onClick={() => setOpen(true)}>
          <CardHeader>
            <CompanyCardAvatar name={marketplace_name} type={"company"} />
            <CardTitle>{marketplace_name}</CardTitle>
          </CardHeader>
          <CardFooter className="h-6"></CardFooter>
        </div>
        <div className="absolute right-3 bottom-2">
          <DeleteAlert inCard={true} id={[id]} type="marketplace" />
        </div>
      </Card>
    </>
  );
}
export default MarketplaceCard;

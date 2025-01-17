import { useGetMySubscriptionQuery } from "@api";
import { Checkout } from "@components";
import { ProductItem } from "@components";
import { SubscriptionInfo } from "../Workspace";

import "./checkout.scss";

export const CheckoutPage = () => {
  const { data: subscription } = useGetMySubscriptionQuery();

  return (
    <section className="checkout">
      <SubscriptionInfo />
      {subscription && subscription.status === "active" ? (
        <ProductItem
          product={subscription.product}
          interval={subscription.price.recurring.interval ?? "week"}
          color="#9fcced"
        />
      ) : (
        <Checkout />
      )}
    </section>
  );
};

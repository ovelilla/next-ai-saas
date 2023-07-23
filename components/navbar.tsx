import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <header className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonPopoverCard: "w-80 pb-4 shadow-lg rounded-lg border-0",
              userButtonPopoverActionButton: "gap-6",
              userButtonPopoverActionButtonIconBox: "basis-0",
              userButtonPopoverActionButtonIcon: "w-4 h-4",
              userButtonPopoverActionButtonText:
                "text-sm tracking-normal text-inherit",
            },
          }}
        />
      </div>
    </header>
  );
};

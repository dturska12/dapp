import { useCanMessage } from "@xmtp/react-sdk";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DateDivider } from "../component-library/components/DateDivider/DateDivider";
import { FullConversation } from "../component-library/components/FullConversation/FullConversation";
import { RecipientInputMode } from "../helpers";
import useGetMessages from "../hooks/useGetMessages";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import { useXmtpStore } from "../store/xmtp";
import { FullMessageController } from "./FullMessageController";

export const FullConversationController = () => {
  let lastMessageDate: Date;
  const [initialConversationLoaded, setInitialConversationLoaded] =
    useState(false);

  const conversationId = useXmtpStore((state) => state.conversationId);

  useEffect(() => {
    setInitialConversationLoaded(false);
  }, [conversationId]);

  const { canMessage } = useCanMessage();
  // XMTP Hooks
  const {
    messages = [],
    hasMore,
    next,
    isLoading,
  } = useGetMessages(conversationId as string);

  if (messages.length === 0) {
    console.log("welcome");
  }

  const isOnSameDay = (d1?: Date, d2?: Date): boolean =>
    d1?.toDateString() === d2?.toDateString();

  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const setStartedFirstMessage = useXmtpStore(
    (state) => state.setStartedFirstMessage,
  );
  // XMTP Hooks
  const { setRecipientInputMode, setRecipientEnteredValue } =
    useGetRecipientInputMode();

  const handleClick = (msg: string) => {
    const ethereumAddressRegex = /0x[a-fA-F0-9]{40}/g;
    const booleanRegex = /true$/g;
    const address = msg.match(ethereumAddressRegex);
    const xmtp = msg.match(booleanRegex);
    if (address !== null && address?.length > 0 && xmtp) {
      setRecipientWalletAddress(address[0]);
      setRecipientInputMode(RecipientInputMode.InvalidEntry);
      setConversationId();
      setRecipientEnteredValue("");
      setStartedFirstMessage(true);
    }
  };

  return (
    <div
      id="scrollableDiv"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className="w-full h-full flex flex-col flex-col-reverse overflow-auto">
      <InfiniteScroll
        className="flex flex-col flex-col-reverse"
        dataLength={messages.length}
        next={() => {
          if (!initialConversationLoaded) {
            setInitialConversationLoaded(true);
          }
          void next();
        }}
        endMessage={!messages?.length}
        hasMore={hasMore}
        inverse
        loader
        scrollableTarget="scrollableDiv">
        <FullConversation
          isLoading={isLoading && !initialConversationLoaded}
          messages={messages?.map((msg, index) => {
            const dateHasChanged = lastMessageDate
              ? !isOnSameDay(lastMessageDate, msg.sent)
              : false;
            const messageDiv = (
              <div
                key={`${msg.id}_${index}`}
                onClick={() => handleClick(msg.content)}>
                {messages.length === 1 || index === messages.length - 1 ? (
                  <DateDivider date={msg.sent} />
                ) : null}
                <FullMessageController msg={msg} idx={index} />
                {dateHasChanged ? <DateDivider date={lastMessageDate} /> : null}
              </div>
            );
            lastMessageDate = msg.sent;
            return messageDiv;
          })}
        />
      </InfiniteScroll>
    </div>
  );
};

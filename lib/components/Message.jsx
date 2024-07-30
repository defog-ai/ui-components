import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { createContext, useContext, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

/**
 * Provides a message manager with success, error, warning, and info messages.
 * Allows subscribing to messages and getting a list of messages.
 *
 * **Usually used with the MessageMonitor and MessageContext components.**
 *
 * @returns {{
 * success: function,
 * error: function,
 * warning: function,
 * info: function,
 * subscribe: function,
 * getList: function,
 * clear: function,
 * getServerSnapshot: function
 * }}
 *
 * @example
 * // Usage with context:
 * const messageManager = MessageManager();
 * <MessageManagerContext.Provider value={messageManager}>
 *   <MessageMonitor />
 *    <App />
 * </MessageManagerContext.Provider>
 *
 *
 * @example
 * // Core class usage
 * const messageManager = MessageManager();
 * messageManager.success("Success message");
 * messageManager.error("Error message");
 * messageManager.warning("Warning message");
 *
 * messageManager.subscribe(() => {
 *  console.log(messageManager.getList());
 * });
 *
 * messageManager.clear();
 * */
export function MessageManager() {
  let list = [];
  let listeners = [];

  const deleteAfter = 3000;

  const deleteMessage = (id) => {
    list = list.filter((m) => m.id !== id);
    emitChange();
  };

  function addMessage(type, message) {
    const time = performance.now();
    const id = v4();

    list = [
      ...list,
      {
        type: type,
        id,
        message: typeof message === "string" ? message : message.message,
        time,
        deleteInterval: setTimeout(() => {
          deleteMessage(id);
        }, deleteAfter),
      },
    ];
  }

  function success(message) {
    addMessage("success", message);
    emitChange();
  }

  function error(message) {
    addMessage("error", message);
    emitChange();
  }

  function warning(message) {
    addMessage("warning", message);
    emitChange();
  }

  function info(message) {
    addMessage("info", message);
    emitChange();
  }

  function clear() {
    list = [];
  }

  function subscribe(listener) {
    listeners = [...listeners, listener];

    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function emitChange() {
    listeners.forEach((l) => l());
  }

  function getList() {
    return list;
  }

  return {
    success,
    error,
    warning,
    info,
    subscribe,
    getList,
    clear,
    // for ssr purposes
    getServerSnapshot: function () {
      return list;
    },
  };
}

/**
 * Context for the MessageManager.
 *
 * @example
 * const messageManager = MessageManager();
 * <MessageManagerContext.Provider value={messageManager}>
 *  <MessageMonitor />
 *   <App />
 * </MessageManagerContext.Provider>
 * */
export const MessageManagerContext = createContext(MessageManager());

const icons = {
  success: <CheckCircleIcon className="text-lime-500 w-4 h-4" />,
  warning: <ExclamationCircleIcon className="text-yellow-400 w-4 h-4" />,
  error: <XCircleIcon className="text-rose-500 w-4 h-4" />,
  info: <InformationCircleIcon className="text-blue-500 w-4 h-4" />,
};

/**
 * Provides a message monitor for the MessageManager. This subscribes to the message manager and displays the messages. By default, renders in a fixed div at the top of the screen.
 *
 * @param {Object} props
 * @param {boolean} [props.disabled] - If true, the message monitor will be disabled. Messages will still be pushed to message manager, but nothign will be displayed by this component.
 * @param {string} [props.rootClassNames] - Additional classes to be added to the root div. For example, You can choose to make this an absolute div at the bottom/top of a relative container if you want to keep the messages "contained" within the portion of the screen your container is in.
 */
export function MessageMonitor({ disabled = false, rootClassNames = "" }) {
  const messageManager = useContext(MessageManagerContext);

  const messages = useSyncExternalStore(
    messageManager.subscribe,
    messageManager.getList,
    messageManager.getServerSnapshot
  );

  return (
    <>
      {!disabled && (
        <div
          className={twMerge(
            "fixed flex flex-col items-center w-full top-0 justify-center pt-4 z-[100] *:transition-all pointer-events-none",
            rootClassNames
          )}
        >
          {messages.map((message, i) => (
            <div
              key={message.time}
              className={twMerge(
                `my-2 flex flex-row gap-2 items-center max-w-[80%] p-2 shadow-md bg-white text-gray-800 mx-auto rounded-lg max-w-10/12 border animate-fade-in-down`,
                message.type === "success" && "border-lime-500",
                message.type === "warning" && "border-yellow-400",
                message.type === "error" && "border-rose-500",
                message.type === "info" && "border-blue-500"
              )}
            >
              <span>{icons[message.type]}</span>
              <span className="grow">{message.message}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

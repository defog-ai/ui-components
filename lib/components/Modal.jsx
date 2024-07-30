import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

/**
 * A modal component.
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - The content of the modal.
 * @param {boolean} [props.open] - If true, the modal will be open.
 * @param {function} [props.onCancel] - Function to be called when the modal is closed.
 * @param {boolean} [props.footer] - If true, the modal will have a footer.
 * @param {React.ReactNode} [props.title] - The title of the modal.
 * @param {React.ReactNode} [props.closeIcon] - The close icon of the modal.
 * @param {function} [props.onOk] - Function to be called when the ok button is clicked.
 * @param {boolean} [props.okLoading] - If true, the ok button will be loading.
 * @param {string} [props.okText] - The text of the ok button.
 * @param {boolean} [props.maskClosable] - NOT IMPLEMENTED YET. If true, the modal will be closed when the mask is clicked.
 * @param {string} [props.rootClassNames] - Additional classes to be added to the root div.
 * @param {string} [props.className] - Additional classes to be added to the modal.
 * @param {string} [props.contentClassNames] - Additional classes to be added to the content div.
 */
export function Modal({
  children = null,
  open = false,
  onCancel = () => {},
  footer = true,
  title = null,
  closeIcon = (
    <XCircleIcon className="w-6 h-6 text-gray-300 hover:text-gray-600" />
  ),
  onOk = () => {},
  okLoading = false,
  okText = "Ok",
  maskClosable = true,
  rootClassNames = "",
  className = "",
  contentClassNames = "",
}) {
  let [isOpen, setIsOpen] = useState(open ? true : false);

  useEffect(() => {
    setIsOpen(open ? true : false);
  }, [open]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        onCancel();
      }}
      className={twMerge("relative z-50", rootClassNames, className)}
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 animate-fade-in transition duration-300 ease-out data-[closed]:opacity-0">
        <div className="absolute w-full h-full bg-gray-800 opacity-50 left-0 top-0 z-[1]"></div>
        <DialogPanel className="h-[95%] w-10/12 space-y-4 z-[2] relative flex flex-row items-center pointer-events-none">
          <div
            className={twMerge(
              "relative max-h-full overflow-scroll p-4 bg-white rounded-md grow pointer-events-auto ",
              contentClassNames
            )}
          >
            <div className="absolute top-2 right-2 z-[3]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onCancel();
                }}
                className="p-1"
              >
                {closeIcon}
              </button>
            </div>

            {title && <DialogTitle>{title}</DialogTitle>}

            {children}

            {footer === true ? (
              <Button
                disabled={okLoading}
                onClick={() => {
                  onOk();
                }}
              >
                {okText}
              </Button>
            ) : (
              footer
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

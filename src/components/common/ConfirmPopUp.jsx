"use client"
// ConfirmPopUp.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmPopUp = ({ onConfirm, onCancel }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black opacity-70"></div>
          <motion.div
            className="z-10 p-6 bg-white rounded-lg shadow-lg w-96"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="mb-4 text-xl font-semibold">Confirm to delete</h2>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this Process Row?
            </p>
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={handleConfirm}
              >
                Confirm
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmPopUp;

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xgvydyoe");

  if (state.succeeded) {
    return (
      <motion.div
        key="confirmation"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-96"
      >
        <motion.div
          className="text-8xl font-black mb-4 transition-colors duration-300 text-black dark:text-white"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            textShadow: "4px 4px 0px #fff, 2px 2px 0px #000",
            WebkitTextStroke: "2px #000",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: 1 }}
        >
          ENVOYÉ!
        </motion.div>
        <motion.p
          className="text-xl font-bold text-center mb-6 transition-colors duration-300 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Merci pour votre message !<br />
          Contactez-moi directement à :<br />
          <span className="font-black">jordanneller97@gmail.com</span>
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="font-black mb-2 block transition-colors duration-300">NOM</label>
          <input id="nom" type="text" name="nom" required className="border-2 font-medium focus:ring-0 transition-colors duration-300 bg-white border-black text-black focus:border-black rounded-md px-3 py-2 w-full" />
          <ValidationError prefix="Nom" field="nom" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="email" className="font-black mb-2 block transition-colors duration-300">EMAIL</label>
          <input id="email" type="email" name="email" required className="border-2 font-medium focus:ring-0 transition-colors duration-300 bg-white border-black text-black focus:border-black rounded-md px-3 py-2 w-full" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div>
        <label htmlFor="sujet" className="font-black mb-2 block transition-colors duration-300">SUJET</label>
        <input id="sujet" type="text" name="sujet" required className="border-2 font-medium focus:ring-0 transition-colors duration-300 bg-white border-black text-black focus:border-black rounded-md px-3 py-2 w-full" />
        <ValidationError prefix="Sujet" field="sujet" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="message" className="font-black mb-2 block transition-colors duration-300">MESSAGE</label>
        <textarea id="message" name="message" required className="border-2 font-medium focus:ring-0 transition-colors duration-300 bg-white border-black text-black focus:border-black rounded-md px-3 py-2 w-full" rows={4} />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <button type="submit" disabled={state.submitting} className="w-full py-4 font-black border-4 text-lg cursor-pointer transition-colors duration-300 bg-black text-white border-black" style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
        ENVOYER UN MESSAGE !
      </button>
    </form>
  );
} 
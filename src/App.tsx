/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Timer,
  Zap,
  ArrowRight,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

const ChristianCross = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3v18M7 9h10" />
  </svg>
);

interface FAQItemProps {
  faq: { q: string; a: string };
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="wine-card overflow-hidden border-divine-gold/10 hover:border-divine-gold/30"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 md:p-6 flex items-center justify-between text-left group transition-colors hover:bg-celestial-sand/30"
      >
        <span className="font-bold text-base md:text-lg text-sacred-black/80 group-hover:text-sacred-black transition-colors">
          {faq.q}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-divine-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-6 pt-0 md:px-6 md:pb-8">
              <div className="h-px w-full bg-divine-gold/10 mb-4" />
              <p className="text-sacred-black/60 leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const [checkoutUrl, setCheckoutUrl] = useState("https://pay.cakto.com.br/3ba47md_870528");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = "https://pay.cakto.com.br/3ba47md_870528";
      const params = new URLSearchParams(window.location.search);
      
      // Preserve existing UTMs and add identification
      params.set("src", "lp2");
      
      const finalUrl = `${baseUrl}?${params.toString()}`;
      setCheckoutUrl(finalUrl);
    }
  }, []);

  const trackCheckout = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-celestial-white text-sacred-black selection:bg-divine-gold selection:text-white relative">
      {/* Background celestial effect */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-from)_0%,_transparent_50%)] from-white to-transparent" />
      <div className="fixed inset-0 pointer-events-none -z-10 cloud-effect" />

      {/* Header Countdown */}
      <div className="fixed top-0 w-full z-50 bg-brand py-3 md:py-4 shadow-[0_4px_25px_rgba(220,38,38,0.3)]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 text-white font-extrabold text-[11px] md:text-lg uppercase tracking-tight text-center">
            <Zap size={18} className="fill-white shrink-0" />
            RECEBA SEUS 3 LIVROS EM:
          </div>
          <div className="flex items-center gap-2 text-white font-mono font-bold text-[14px] md:text-2xl bg-sacred-black/20 px-3 py-1 rounded-full border border-white/30 shadow-inner">
            <Timer size={22} className="text-white shrink-0" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden border-b border-divine-gold/10">
        {/* Imagem Responsiva (Full Width) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full mb-10"
        >
          <a href={checkoutUrl} onClick={trackCheckout} className="block w-full cursor-pointer">
            {/* VERSÃO MOBILE: Imagem vertical/quadrada */}
            <img 
              src="https://i.ibb.co/3YdxDgwS/BANNER-SITE-1.webp" 
              alt="Apocalipse Mobile" 
              className="block md:hidden w-full h-auto"
              referrerPolicy="no-referrer"
            />
            
            {/* VERSÃO DESKTOP: Imagem horizontal */}
            <img 
              src="https://i.ibb.co/p6pDyDKm/BANNER-SITE-PC.webp" 
              alt="Apocalipse Desktop" 
              className="hidden md:block w-full h-auto max-h-[600px] object-contain object-center"
              referrerPolicy="no-referrer"
            />
          </a>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* HEADLINE MOBILE */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:hidden font-sans text-4xl font-extrabold mb-6 leading-tight tracking-tight uppercase text-sacred-black"
          >
            Entenda o <span className="text-brand">Apocalipse</span> de forma simples, clara e baseada na Bíblia
          </motion.h1>

          {/* HEADLINE DESKTOP */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block font-sans text-7xl font-extrabold mb-10 leading-[1.1] tracking-tight uppercase text-sacred-black"
          >
            Entenda o <span className="text-brand">Apocalipse</span> de forma simples, <br /> clara e baseada na Bíblia
          </motion.h1>

          {/* SUBHEADLINE MOBILE */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:hidden mb-8 space-y-2"
          >
            <p className="text-lg text-sacred-blue font-bold leading-tight">
              Receba 3 livros digitais com explicações simples e baseadas na Bíblia por apenas <span className="text-brand">R$19,90</span>.
            </p>
          </motion.div>

          {/* SUBHEADLINE DESKTOP */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block mb-12 max-w-3xl mx-auto text-balance"
          >
            <p className="text-2xl text-sacred-blue font-bold leading-tight">
              Receba 3 livros digitais com explicações simples e baseadas na Bíblia por apenas <span className="text-brand font-bold">R$19,90</span>.
            </p>
          </motion.div>

          {/* Bullets */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-start gap-4 mb-12 max-w-fit mx-auto text-left"
          >
            {[
              "O verdadeiro significado dos 4 Cavaleiros",
              "O que realmente são as 7 Trombetas",
              "Quem é o Anticristo segundo a Bíblia"
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2 text-base md:text-xl font-bold text-sacred-black/80">
                <ChristianCross size={18} className="text-divine-gold shrink-0" />
                {bullet}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-full sm:w-auto"
          >
            <a 
              href={checkoutUrl}
              onClick={trackCheckout}
              className="inline-flex flex-col items-center justify-center gap-1 px-12 py-6 bg-brand hover:bg-brand-hover text-white rounded-full aggressive-shadow transition-all transform hover:scale-105 active:scale-95 text-center"
            >
              <div className="flex items-center gap-2 text-xl md:text-2xl font-extrabold uppercase tracking-tight">
                ACESSAR AGORA POR R$19,90
                <ArrowRight size={24} className="shrink-0" />
              </div>
              <div className="text-xs md:text-sm font-medium opacity-90">Pagamento Único • Acesso Vitalício</div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Ideal para você checklist */}
      <section className="py-12 md:py-20 px-4 bg-celestial-sand border-b border-divine-gold/10">
        <div className="max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-12 text-center leading-tight text-sacred-black"
          >
            Esse material é <span className="text-brand">ideal</span> para você que...
          </motion.h2>
          
          <div className="space-y-10">
            {[
              "Tem dificuldade para entender a Bíblia, especialmente o livro de Apocalipse",
              "É líder ou estudioso e quer material organizado para ensinar ou se aprofundar",
              "Busca a verdade bíblica sobre o fim dos tempos, sem conspirações",
              "Sente necessidade de se preparar espiritualmente para a volta de Cristo",
              "Prefere conteúdo direto, claro e objetivo"
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-center"
              >
                <div className="w-7 h-7 shrink-0 bg-divine-gold rounded-full flex items-center justify-center text-white shadow-lg shadow-divine-gold/20">
                  <ChristianCross size={14} />
                </div>
                <p className="text-lg md:text-xl font-normal text-sacred-black/90 leading-tight">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-10 border-t border-divine-gold/20"
          >
            <a 
              href={checkoutUrl}
              onClick={trackCheckout}
              className="w-full inline-flex flex-col items-center justify-center gap-1 px-8 py-6 bg-brand hover:bg-brand-hover text-white rounded-full aggressive-shadow transition-all transform hover:scale-105 active:scale-95 text-center"
            >
              <div className="flex items-center gap-2 text-xl md:text-2xl font-extrabold uppercase tracking-tight">
                ACESSAR AGORA POR R$19,90
                <ArrowRight size={24} className="shrink-0" />
              </div>
              <div className="text-xs md:text-sm font-medium opacity-90">Pagamento Único • Acesso Vitalício</div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Countdown Promo Section */}
      <section className="py-12 md:py-20 px-4 bg-white border-b border-divine-gold/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 cloud-effect pointer-events-none opacity-[0.03]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tight leading-[1.1] text-sacred-black">
              Não deixe essa <span className="text-brand">oportunidade passar</span>
            </h2>
            
            <div className="text-6xl md:text-9xl font-extrabold text-brand tracking-normal">
              {formatTime(timeLeft)}
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs md:text-base tracking-tight font-bold">
              {[
                "Explicação simples e direta",
                "Base bíblica",
                "Conexão com o que acontece no mundo",
                "Conteúdo organizado para leitura fácil"
              ].map((txt, i) => (
                <div key={i} className="flex items-center gap-1.5 whitespace-nowrap">
                  <div className="w-5 h-5 bg-accent-green rounded-full flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 size={12} strokeWidth={4} />
                  </div>
                  <span className="text-sacred-black/70">{txt}</span>
                  {i < 3 && <span className="text-sacred-black/10 ml-2">|</span>}
                </div>
              ))}
            </div>

            <div className="pt-8">
              <a 
                href={checkoutUrl}
                onClick={trackCheckout}
                className="inline-flex flex-col items-center justify-center gap-1 px-12 py-6 bg-brand hover:bg-brand-hover text-white rounded-full aggressive-shadow transition-all transform hover:scale-105 active:scale-95 text-center max-w-full"
              >
                <div className="flex items-center gap-2 text-xl md:text-3xl font-extrabold uppercase tracking-tight">
                  ACESSAR AGORA POR R$19,90 
                  <ArrowRight size={24} className="shrink-0" />
                </div>
                <div className="text-xs md:text-sm font-medium opacity-90">Pagamento Único • Acesso Vitalício</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final Offer Summary */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden" id="oferta">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Visual Column */}
            <div className="space-y-4 md:sticky md:top-24">
              <a href={checkoutUrl} onClick={trackCheckout} className="block group">
                <div className="wine-card p-1 relative overflow-hidden border-divine-gold/30 shadow-[0_20px_60px_rgba(201,168,76,0.15)] group">
                  <img 
                    src="https://i.ibb.co/3YdxDgwS/BANNER-SITE-1.webp" 
                    alt="Mockup Apocalipse" 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
              <div className="wine-card p-4 flex flex-col items-center justify-center gap-1 border-divine-gold/20 bg-white">
                <div className="text-accent-green font-extrabold uppercase text-xs tracking-wider">● Acesso Imediato</div>
                <div className="text-sacred-black/40 text-xs font-bold uppercase tracking-wider">Envio via e-mail após confirmação</div>
              </div>
            </div>

            {/* List and Pricing Column */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="font-sans text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-8 leading-[1.1] text-sacred-black">
                  TUDO QUE VOCÊ <br /><span className="text-brand">VAI LEVAR HOJE:</span>
                </h2>
              </div>

              <div className="space-y-2">
                {[
                  { name: "Livro: Os 4 Cavaleiros do Apocalipse", old: "37" },
                  { name: "Livro: As 7 Trombetas do Fim", old: "37" },
                  { name: "Livro: A Revelação do Anticristo", old: "37" },
                  { name: "Acesso Imediato e Vitalício", status: "Incluso" },
                  { name: "Leitura Simples e Direta", status: "Incluso" },
                  { name: "Conteúdo 100% Baseado na Bíblia", status: "Incluso" }
                ].map((item, i) => (
                  <div key={i} className="wine-card p-3 md:p-4 flex items-center justify-between gap-3 group transition-all hover:bg-celestial-sand/20 border-divine-gold/10 bg-white">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-divine-gold/5 border border-divine-gold/20 flex items-center justify-center text-divine-gold group-hover:bg-divine-gold group-hover:text-white transition-all shrink-0">
                        <ChristianCross size={14} />
                      </div>
                      <span className="font-bold uppercase tracking-tight text-sacred-black/70 group-hover:text-sacred-black transition-colors text-[10px] md:text-sm">
                        {item.name}
                      </span>
                    </div>
                    {item.old ? (
                      <div className="text-sacred-black font-bold text-xs md:text-sm whitespace-nowrap shrink-0 flex items-center">
                        <span className="mr-1 opacity-40">R$</span> {item.old}
                      </div>
                    ) : (
                      <div className="text-[9px] md:text-[10px] font-bold text-accent-green uppercase tracking-wider bg-accent-green/5 px-2 py-1 rounded border border-accent-green/20 shrink-0">
                        {item.status}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Price Reveal */}
              <div className="wine-card p-8 bg-gradient-to-b from-celestial-sand/50 to-white border-brand/20 aggressive-shadow text-center">
                <div className="space-y-1 mb-6">
                  <div className="text-sacred-black text-lg font-bold">De <span className="line-through decoration-brand">R$ 111,00</span> por apenas:</div>
                  <div className="text-brand text-7xl md:text-8xl font-extrabold font-sans tracking-tight drop-shadow-[0_0_30px_rgba(220,38,38,0.15)] flex items-baseline justify-center">
                    <span className="text-4xl mr-1">R$</span>
                    19<span className="text-4xl text-brand/80">,90</span>
                  </div>
                  <div className="text-sacred-black/50 text-xs font-bold uppercase tracking-normal mt-1 font-sans">
                    Pague no Pix, Cartão ou Boleto
                  </div>
                </div>

                <a 
                  href={checkoutUrl}
                  onClick={trackCheckout}
                  className="w-full inline-flex flex-col items-center justify-center gap-1 px-6 py-5 bg-brand hover:bg-brand-hover text-white rounded-full aggressive-shadow transition-all transform hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  <div className="flex items-center gap-2 text-xl md:text-2xl font-extrabold uppercase tracking-tight">
                    ACESSAR AGORA
                    <ArrowRight size={24} className="shrink-0" />
                  </div>
                  <div className="text-xs font-medium opacity-90">Pagamento Único · Acesso Vitalício</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-24 px-4 bg-celestial-off border-t border-divine-gold/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-sacred-black">
              DÚVIDAS <span className="text-brand">FREQUENTES</span>
            </h2>
            <p className="text-sacred-black/40 font-bold uppercase tracking-widest text-xs">
              Tiramos as principais dúvidas sobre a coleção
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "É livro físico ou digital?",
                a: "É material digital. Você recebe acesso online após a confirmação do pagamento."
              },
              {
                q: "Como recebo o acesso?",
                a: "O acesso é liberado após o pagamento no e-mail informado na compra."
              },
              {
                q: "Posso ler pelo celular?",
                a: "Sim. Você pode acessar pelo celular, computador ou tablet."
              },
              {
                q: "É pagamento único?",
                a: "Sim. Você paga uma vez e recebe o acesso à coleção."
              },
              {
                q: "Preciso ter conhecimento avançado da Bíblia?",
                a: "Não. A coleção foi organizada para uma leitura simples e objetiva."
              }
            ].map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
              href={checkoutUrl}
              onClick={trackCheckout}
              className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-extrabold uppercase tracking-tight text-lg md:text-xl group"
            >
              GARANTIR MEU ACESSO AGORA
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-16 px-4 border-t border-divine-gold/10 bg-sacred-blue relative overflow-hidden shadow-[0_-10px_50px_rgba(26,26,46,0.3)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-divine-gold/30" />
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="font-sans font-extrabold text-divine-gold text-3xl uppercase tracking-tight leading-none">
            Apocalipse <br /> Revelado
          </div>
          <div className="space-y-4">
            <p className="text-white/70 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed border-b border-white/5 pb-10 mb-6">
              Você não está comprando teoria complicada <br className="hidden md:block" />
              Está adquirindo um material direto ao ponto para entender o Apocalipse sem dificuldade
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-divine-gold" />
              <span className="text-xs text-white/50 font-bold uppercase tracking-wider">Compra 100% Segura</span>
            </div>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider leading-relaxed max-w-2xl mx-auto">
              PRODUTO DIGITAL EXTRAÍDO DE ESTUDOS BÍBLICOS NÃO GARANTIMOS EVENTOS FUTUROS APENAS INTERPRETAÇÕES DAS ESCRITURAS SAGRADAS TODA COMPRA É PROTEGIDA COM 7 DIAS DE GARANTIA INCONDICIONAL
            </p>
          </div>
          <p className="text-xs text-white/20 font-bold uppercase tracking-widest">© 2024 TODOS OS DIREITOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}


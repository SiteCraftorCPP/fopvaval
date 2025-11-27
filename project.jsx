import React from "react";
import { motion, useInView } from "framer-motion";
import {
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";
import phonImage from "./images/phon.png";

// =============================
// Быстрые настройки контента
// ВАЖНО: не-ASCII в JS-строках — только в \uXXXX. Текст в JSX — напрямую.
// =============================
const profile = {
  name: "",
  // "Санкт‑Петербург"
  city: "\u0421\u0430\u043D\u043A\u0442\u2011\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433",
  tagline: "",
  about: "",
  whoIAm: {
    heightCm: undefined,
    weightKg: undefined,
    hair: undefined,
    eyes: undefined,
    education: undefined,
    sports: undefined,
    geneticHistory: undefined,
    healthyChild: true,
    dnaTest: true,
    bloodType: undefined,
    rh: undefined,
    cmvStatus: undefined,
    smoking: undefined,
    alcohol: undefined,
    languages: [],
    readyToMeet: true,
  },
  contacts: {
    telegram: "https://t.me/fapavlov",
    email: "mailto:you@example.com",
  },
};

function isEmptyValue(v) {
  return v == null || (typeof v === "string" && v.trim() === "");
}

const Labeled = ({ label, value }) => (
  <div className="flex items-start gap-3 py-1.5 leading-6">
    <span className="text-sm text-zinc-500 shrink-0 basis-28 md:basis-40">{label}</span>
    <span className="text-sm font-medium flex-1 min-w-0 break-words whitespace-normal">
      {isEmptyValue(value) ? <span className="opacity-60">уточняется</span> : value}
    </span>
  </div>
);

const roadmap = [
  {
    renderTitle: () => <>Знакомство по переписке</>,
    renderText: () => <>По запросу: фото, актуальные анализы, результаты тестов</>,
  },
  {
    renderTitle: () => <>Знакомство вживую</>,
    renderText: () => <>Встреча в удобном месте, общение, уточняющие вопросы</>,
  },
  {
    renderTitle: () => <>Подбор клиники</>,
    renderText: () => <>Вы подбираете любую лицензированную клинику репродукции</>,
  },
  {
    renderTitle: () => <>Сдача анализов</>,
    renderText: () => <>Я сдаю все необходимые анализы за свой счёт. От Вас ничего не требуется</>,
  },
  {
    renderTitle: () => <>Процедура ЭКО</>,
    renderText: () => <>Всё проходит в выбранной Вами клинике, в удобное для Вас время</>,
  },
];

// Анимационные варианты
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Компонент для анимации секций
function SectionWithAnimation({ id, className, children }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}

export default function DonorLanding() {
  return (
    <div lang="ru" className="min-h-screen text-zinc-900">
      {/* Global background image */}
      <motion.div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${phonImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* NAV */}
      <motion.header 
        className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/20 border-b border-zinc-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-center">
          <nav className="flex items-center gap-6 text-sm">
            <motion.a 
              href="#how" 
              className="hover:text-violet-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Как это работает
            </motion.a>
            <motion.a 
              href="#who" 
              className="hover:text-violet-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Обо мне
            </motion.a>
            <motion.a 
              href={profile.contacts.telegram} 
              className="px-3 py-1.5 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Написать в Telegram
            </motion.a>
          </nav>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="relative py-12">
        <div className="mx-auto max-w-6xl px-4 grid gap-10 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Осознанный выбор донора начинается со знакомства
            </motion.h1>
            <motion.div 
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a 
                href="#contact" 
                className="px-5 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-4 w-4" /> Связаться
              </motion.a>
              <motion.a 
                href="#how" 
                className="px-5 py-3 rounded-xl border border-zinc-300 hover:border-violet-400 hover:text-violet-700 transition inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, borderColor: "#a78bfa" }}
                whileTap={{ scale: 0.95 }}
              >
                <ClipboardCheck className="h-4 w-4" /> Как это работает
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <SectionWithAnimation id="how" className="bg-transparent py-12">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Как это работает
          </motion.h2>
          <div className="mt-8 relative">
            <motion.ol 
              className="grid gap-6 md:grid-cols-5 auto-rows-fr"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {roadmap.map((step, idx) => (
                <motion.li 
                  key={idx} 
                  className="relative z-10 rounded-2xl border-0 bg-white/60 backdrop-blur-sm p-6 shadow-sm h-full flex flex-col"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    backgroundColor: "rgba(255, 255, 255, 0.75)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="shrink-0 h-8 w-8 rounded-full bg-violet-600 text-white grid place-items-center font-semibold"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {idx + 1}
                    </motion.div>
                    <div className="font-medium">{step.renderTitle()}</div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-700 leading-relaxed">{step.renderText()}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </SectionWithAnimation>

      {/* WHO I AM */}
      <SectionWithAnimation id="who" className="bg-transparent py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-24">
          {/* Блок 1: почему со мной */}
          <motion.div 
            className="rounded-3xl border border-zinc-200/50 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)"
            }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Почему со мной проще сделать осознанный выбор
            </motion.h2>
            <div className="mt-3 text-sm text-zinc-700 space-y-3">
              <p>{"В клинике анкеты часто обезличены \u2014 про человека за ними почти ничего не известно. Со мной всё по\u2011другому: можно познакомиться, задать любые вопросы и увидеть не только анализы, но и образ жизни, ценности и планы."}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{"Живые встречи и честные ответы \u2014 столько, сколько нужно, без спешки и давления."}</li>
                <li>{"Открыто рассказываю о себе и предоставляю свежие документы по запросу."}</li>
                <li>{"Уважение к вашему темпу: если почувствуете, что мы не совпали \u2014 это нормально."}</li>
                <li>{"Итоговое решение за вами \u2014 я рядом, чтобы помочь сделать его уверенно и спокойно."}</li>
              </ul>
            </div>
          </motion.div>

          {/* Блок 2: обо мне (объединённые факты) */}
          <motion.div 
            className="rounded-3xl border border-zinc-200/50 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)"
            }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Обо мне
            </motion.h2>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-sm text-zinc-600">Общее</div>
                <Labeled label={<span>Город</span>} value={<span>{profile.city}</span>} />
                <Labeled label={<span>Рост</span>} value={<><span>172</span> <span>см</span></>} />
                <Labeled label={<span>Вес</span>} value={<><span>68</span> <span>кг</span></>} />
                <Labeled label={<span>Возраст</span>} value={<span>35 лет</span>} />
                <Labeled label={<span>Цвет глаз</span>} value={<span>Карий</span>} />
                <Labeled label={<span>Цвет волос</span>} value={<span>Русый</span>} />
                <Labeled label={<span>Образование</span>} value={<span>Два высших</span>} />

                <div className="mt-6 h-px bg-zinc-200" />
                <div className="mt-6 text-sm text-zinc-600">Образ жизни</div>
                <Labeled label={<span>Курение</span>} value={<span>Никогда не курил</span>} />
                <Labeled label={<span>Алкоголь</span>} value={<span>Изредка</span>} />
                <Labeled label={<span>Наркотики</span>} value={<span>Исключено</span>} />
                <Labeled label={<span>Физическая активность</span>} value={<span>Высокая</span>} />
                <Labeled label={<span>Питание</span>} value={<span>Здоровое</span>} />
              </div>
              <div>
                <div className="text-sm text-zinc-600">Медицина</div>
                <Labeled label={<span>Наследственные заболевания</span>} value={<span>Отсутствуют</span>} />
                <Labeled label={<span>Здоровый ребёнок</span>} value={<span>да</span>} />
                <Labeled label={<span>{"ДНК\u2011тест"}</span>} value={<span>есть</span>} />
                <Labeled label={<span>Группа крови</span>} value={<span>O (I)</span>} />
                <Labeled label={<span>{"Резус\u2011фактор"}</span>} value={<span>Rh+</span>} />
                <Labeled label={<span>Антиген Kell</span>} value={<span>{"Kell-"}</span>} />

                <div className="mt-6 h-px bg-zinc-200" />
                <div className="mt-6 text-sm text-zinc-600">Дополнительно (по запросу)</div>
                <ul className="mt-2 text-sm list-disc pl-5 text-zinc-700 space-y-1">
                  <li>{"Актуальная спермограмма и MAR\u2011тест"}</li>
                  <li>Специализированное генетическое тестирование (при необходимости)</li>
                  <li>Справки и анализы по перечню вашей клиники</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWithAnimation>

      {/* CONTACT */}
      <SectionWithAnimation id="contact" className="bg-transparent py-12 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div 
            className="rounded-3xl border border-violet-200/50 bg-white/70 backdrop-blur-sm p-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 12px 32px rgba(124, 58, 237, 0.15)"
            }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Написать в Telegram
            </motion.h2>
            <motion.a 
              href={profile.contacts.telegram} 
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 20px rgba(124, 58, 237, 0.4)",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-5 w-5" /> Написать в Telegram
            </motion.a>
          </motion.div>
        </div>
      </SectionWithAnimation>
    </div>
  );
}

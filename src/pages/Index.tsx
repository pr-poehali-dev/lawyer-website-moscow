import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [consents, setConsents] = useState({
    personalData: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: "Scale",
      title: "Уголовные дела",
      description:
        "Представление интересов доверителей и защита по уголовным делам подозреваемых, обвиняемых, свидетелей, а также по вопросам связанным с исполнением приговора",
      details: [
        "Консультирование по вопросам правоприменительной практики по уголовным делам, выработка правовой позиции по делу",
        "Правовая помощь подозреваемым, обвиняемым, свидетелям, а также потерпевшим на стадии дознания или предварительного расследования",
        "Защита доверителей и представление интересов потерпевших при рассмотрении уголовных дел всех категорий в суде первой, апелляционной, кассационной инстанции, а также в Верховном суде РФ",
        "Представление интересов потерпевших в уголовном деле на стадии предварительного расследования, дознания и в суде",
        "Предъявления гражданского иска в уголовном деле в интересах потерпевших",
        "Обжалование действий и бездействий должностных лиц в порядке статьи 124,125 УПК РФ",
        "Сбор доказательств по уголовному делу",
        "Обжалование приговора в судах всех инстанций",
        "Представление интересов доверителей по вопросам связанным с исполнением приговора, по вопросам отбывания наказания, об отсрочке исполнения наказания, об условно-досрочном освобождении от наказания, освобождения от наказания или смягчения наказания вследствие издания уголовного закона, имеющего обратную силу, замене неотбытой части наказания более мягким",
      ],
    },
    {
      icon: "Users",
      title: "Гражданские дела",
      description:
        "Представление интересов доверителей по гражданским, семейным, трудовым и наследственных делам",
      details: [
        "Консультирование по вопросам правоприменительной практики по гражданскому делу, выработка правовой позиции по делу",
        "Составление и подача в интересах доверителей процессуальных документов в суд: исковые заявления, ходатайства, заявления",
        "Представление интересов доверителей в судах общей юрисдикции всех уровней и инстанций",
        "Обжалование решений, определений по делу в суды вышестоящих инстанций (апелляционные, кассационные жалобы на решения суда)",
        "Представление интересов доверителей на стадии исполнения решений (определений) суда",
        "Представление интересов доверителей в службе судебных приставов, обжалование незаконных действий (бездействий) судебных приставов, по вопросам связанным с исполнением решений суда",
        "Представление интересов доверителей в судах общей юрисдикции по делам применения семейного и трудового законодательства, а также по имущественным спорам, по делам об установлении фактов, имеющих юридическое значение, по делам об оспаривании решений и действий (бездействия) органов государственной власти и местного самоуправления, иным гражданским делам",
      ],
    },
    {
      icon: "Building2",
      title: "Арбитражные дела",
      description:
        "Представление интересов юридических лиц и индивидуальных предпринимателей в арбитражных судах всех уровней",
      details: [
        "Консультирование юридических лиц и индивидуальных предпринимателей по вопросам правоприменительной практики по спорам связанным с коммерческой и предпринимательской деятельностью, корпоративные споры, выработка правовой позиции по делу",
        "Составление и подача в интересах доверителей процессуальных документов в суд: исковые заявления, ходатайства, заявлений в арбитражный суд по всем видам категорий споров",
        "Представление интересов юридических лиц и индивидуальных предпринимателей в арбитражных судах всех уровней, в том числе по делам об оспаривании ненормативных правовых актов, решений и действий (бездействия) государственных органов, а также рассмотрении дел по интеллектуальным спорам, по делам об административных правонарушениях и иным делам",
        "Представление и защита интересов доверителей юридических лиц и индивидуальных во всех государственных органах и учреждениях, органах местного самоуправления, в коммерческих и некоммерческих организациях, надзорных органах, по вопросам связанным с осуществлением предпринимательской деятельности",
        "Сопровождение доверителей при проведении выездных проверок налоговыми органами, обжалование действий (бездействий) должностных лиц и документов составленных в отношении доверителей",
        "Взыскание задолженности с контрагентов по делам вытекающим из осуществления доверителем предпринимательской, коммерческой деятельности",
        "Представление интересов доверителей на стадии исполнения решений (определений) суда",
        "Представление интересов доверителей в службе судебных приставов, обжалование незаконных действий (бездействий) судебных приставов-исполнителей, по вопросам связанным с исполнением решений суда",
      ],
    },
    {
      icon: "FileText",
      title: "Юридическое сопровождение бизнеса",
      description:
        "Комплексное правовое обслуживание бизнеса. Пакет услуг обсуждается индивидуально в зависимости от специфики и потребности бизнеса доверителя",
      details: [
        "Абонентское юридическое обслуживание и сопровождение бизнеса. Пакет услуг обсуждается индивидуально в зависимости от специфики и потребности бизнеса доверителя",
        "Комплексное юридическое обслуживание бизнеса. Пакет услуг обсуждается индивидуально в зависимости от специфики и потребности бизнеса доверителя",
        "Разработка и согласование договоров в рамках абонентского обслуживания и сопровождения бизнеса доверителя",
        "Претензионно-исковая работа в рамках абонентского обслуживания и сопровождения бизнеса доверителя",
        "Экспертиза договоров и выявление потенциальных рисков в рамках абонентского обслуживания и сопровождения бизнеса",
        "Подготовка необходимых корпоративных документов, документов для государственной регистрации",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Алина",
      text: 'Хочу выразить благодарность Алексею Геннадьевичу! Обратилась к нему по трудовому спору, так как бывший работодатель после увольнения не выплатил мне заработную плату. Я обращалась к многим юристам за консультацией, но все общение с ними сводилось чтоб "развести" на консультацию, а дельных советов или решения моего вопроса так от них и не услышала. Алексей Геннадьевич четко определил суть вопроса и путь решения. Написал в надзорные органы несколько жалоб, работодатель все выплатил, сам и без суда!!! Рекомендую этого адвоката как профессионала.',
    },
    {
      name: "Анна",
      text: "Обращалась к этому адвокату по вопросу защиты моего брата по уголовному делу. Брат обвинялся в грабеже, хищении мобильного телефона. Изначально на следствии брату был предоставлен государственный адвокат по назначению. Я уверена, что если бы этот адвокат остался в деле до конца, то брата бы точно посадили. Профессиональная работа Алексея Геннадьевича на стадии предварительного следствия, путем защиты брата на допросах и активном участии в очных ставках позволило переквалифицировать преступление в другую категорию тяжести на ч. 1 ст. 158 УК РФ. В дальнейшем в суде по ходатайству Алексея Геннадьевича дело было вовсе прекращено, и мы отделались только штрафом! Я очень благодарна что судьба свела меня именно с этим адвокатом. Теперь всем друзьям и знакомым советую его по любым вопросам.",
    },
    {
      name: "Валентина Андреевна",
      text: "Попала на консультацию к Алексею Геннадьевичу по рекомендации знакомого. Я врач высшей категории. Работала в государственном учреждении и являлась членом врачебной комиссии. Так случилось, что по причине чужой халатности на меня решили повесить материальные убытки которые понес пациент проходивший комиссию (судебные медицинские заключения, транспортные расходы, расходы на юристов), суммы были заоблачные. При этом я была ни в чем не виновата, так как решал в итоге председатель комиссии. Работодатель решил взыскать эти расходы с меня в судебном порядке. Итог, все дисциплинарные взыскания в отношении меня суд признал незаконными и полностью отказал в удовлетворении исковых требований с меня. Все расходы мои на адвоката повесили на работодателя, я очень довольна результатом. Спасибо за профессиональный подход.",
    },
    {
      name: "Наталья",
      text: "Мой несовершеннолетний сын был задержан, при нем были обнаружены наркотики. По рекомендации друга обратилась к адвокату Мушовец Алексею Геннадьевичу. Я очень ему благодарна за незамедлительную реакцию на эти события. Он успел прибыть в полицию до первого допроса сына, в котором должен был участвовать бесплатный адвокат, предоставленный полицией. Изначально следователь хотел вменить ему статью за сбыт, но после допроса следователь принял решение возбудить дело по ч. 1 ст. 228 УК. Правильная защита сына на допроса и очной ставке спасла ему судьбу. В итоге дело было прекращено в суде, отделались только штрафом, а сын поступил в институт и успешно учится. Спасибо огромное!",
    },
    {
      name: "Аноним",
      text: "Я могу сказать об этом адвокате, что он не из самых дешевых адвокатов, но за успех и профессиональный подход надо платить достойно. В результате грамотной работе в суде, удалось признать сделку купли-продажи квартиры в Москве недействительной. В итоге вернула свою квартиру обратно в собственность, а мошенники были привлечены к уголовной ответственности и получили по заслугам. Рекомендую обращаться.",
    },
    {
      name: "Мария",
      text: "Обвинялась в незаконной банковской деятельности (обнал), прокурор грозил посадить на 5 лет. Адвокат Алексей Геннадьевич выбрал единственно верный способ защиты на предварительном следствии и в суде. В итоге получила 2 года условно.",
    },
    {
      name: "Эгамберди",
      text: "Являюсь гражданином Киргизии. Обвинялся в совершении грабежа, был задержан и отправлен под стражу. Готовился, что посадят минимум на 3 года. Алексея Геннадьевича нанял для меня мой брат. После вступления в дело он ознакомился с уголовным делом и увидел в документах фальсификацию со стороны следственных органов. Я не знаю всех подробностей как у него получилось, но через два месяца после возбуждения уголовного дела и нахождении меня в СИЗО, уголовное дело было переквалифицировано кражу в категорию средней тяжести. В суде по ходатайству следователя дело было прекращено, дали судебный штраф 20 тр. Очень благодарен адвокату.",
    },
    {
      name: "Александр",
      text: "Очень грамотно проконсультировал и написал нужный документ. Обошли без дорогостоящих судов.",
    },
    {
      name: "Михаил",
      text: "Покупал готовый бизнес, необходимо было проверить и оценить все риски оформления прав. Порекомендовали Алексея Геннадьевича. В ходе переговоров мною и продавцом решили привлечь его на сопровождение сделки. Сделку оформили, я доволен что все прошло гладко и без проволочек. Сейчас обслуживает мой бизнес в рамках юридического сопровождения. Тоже все прекрасно. Четкий, конкретный, без вопросов.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: "",
      phone: "",
      email: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Введите ваше имя";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Введите номер телефона";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Введите email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Введите корректный email";
      isValid = false;
    }

    if (!consents.personalData) {
      toast({
        title: "Необходимо дать согласие для отправки",
        variant: "destructive",
      });
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://functions.poehali.dev/36e0ccde-a82b-4626-bfb7-e1d922dbd482",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setFormData({ name: "", phone: "", email: "", message: "" });
        setConsents({ personalData: false });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Ошибка при отправке",
        description: "Попробуйте позже или свяжитесь по телефону",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-[#1a1a1a] backdrop-blur z-50 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-white">Адвокатский кабинет</span>
              <span className="text-sm text-white/70">Адвоката Мушовец Алексея Геннадьевича</span>
              <span className="text-xs text-white/60">номер в реестре адвокатов города Москвы 77/14943</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
            </button>

            <div
              className={`${
                mobileMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row absolute md:relative top-20 md:top-0 left-0 right-0 bg-[#1a1a1a] md:bg-transparent border-b border-white/10 md:border-0 p-4 md:p-0 gap-2 md:gap-8`}
            >
              {[
                { id: "hero", label: "Главная" },
                { id: "services", label: "Услуги" },
                { id: "about", label: "Обо мне" },
                { id: "contact", label: "Контакты" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors text-left md:text-center ${
                    activeSection === item.id
                      ? "text-accent font-medium"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section
        id="hero"
        ref={(el) => (sectionRefs.current.hero = el)}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/97319bbf-bcb6-4967-8ae8-0cc80ac8d0df.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32">
          <div className="max-w-4xl">
            <div
              className={`space-y-6 md:space-y-8 transition-all duration-1000 ${
                visibleSections.has("hero")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-4 mt-48 md:mt-56">
                <p className="text-xl md:text-3xl text-white/90 font-medium drop-shadow-lg">
                  Более 20 лет практики
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="text-base md:text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-white font-semibold shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
                >
                  Получить консультацию
                  <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("services")}
                  className="text-base md:text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold transition-all duration-300"
                >
                  Наши услуги
                  <Icon name="ChevronDown" className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <button
            onClick={() => scrollToSection("services")}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Icon name="ChevronDown" className="h-8 w-8" />
          </button>
        </div>
      </section>

      <section
        id="services"
        ref={(el) => (sectionRefs.current.services = el)}
        className="py-12 md:py-20 px-4 bg-black/5"
      >
        <div className="container mx-auto">
          <div
            className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
              visibleSections.has("services")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Услуги</h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
              Представление интересов доверителей и защита по уголовным делам
              подозреваемых, обвиняемых, свидетелей, а также по вопросам
              связанным с исполнением приговора
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`transition-all duration-1000 hover:shadow-lg ${
                  visibleSections.has("services")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <Icon
                        name={service.icon}
                        className="h-5 w-5 md:h-6 md:w-6 text-accent"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg md:text-xl font-semibold">{service.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {service.description}
                      </p>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details">
                          <AccordionTrigger className="text-sm">
                            Подробнее
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="text-accent mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={(el) => (sectionRefs.current.about = el)}
        className="py-12 md:py-20 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has("about")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Обо мне
            </h2>
            <Card>
              <CardContent className="p-4 md:p-8 space-y-4 md:space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    С 2005 года я занимаюсь защитой прав и интересов граждан и
                    организаций. За годы практики накоплен богатый опыт в
                    ведении самых сложных и нестандартных дел.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Каждое дело для меня — это не просто юридическая задача, а
                    судьба конкретного человека. Я глубоко убежден, что
                    профессиональная защита должна быть доступна каждому, кто в
                    ней нуждается.
                  </p>

                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Icon name="Scale" className="h-5 w-5" />
                      <span className="font-semibold">Специализация</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Уголовное, гражданское и арбитражное право
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Icon name="MapPin" className="h-5 w-5" />
                      <span className="font-semibold">География</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Москва и Московская область
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        className="py-12 md:py-20 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              visibleSections.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center">
              Контакты
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <Card>
                <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 text-lg">
                      Контактная информация
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="Phone"
                          className="h-5 w-5 text-accent mt-1"
                        />
                        <div>
                          <a
                            href="tel:+79060194020"
                            className="font-semibold hover:text-accent transition-colors"
                          >
                            +7 906 019-40-20
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Icon
                          name="Mail"
                          className="h-5 w-5 text-accent mt-1"
                        />
                        <div>
                          <a
                            href="mailto:advokatmushovets@mail.ru"
                            className="font-semibold hover:text-accent transition-colors break-all"
                          >
                            advokatmushovets@mail.ru
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <a
                          href="https://wa.me/79060194020"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                        >
                          <Icon name="MessageCircle" className="h-5 w-5" />
                          <span className="text-sm">WhatsApp</span>
                        </a>
                        <a
                          href="https://t.me/+79060194020"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                        >
                          <Icon name="Send" className="h-5 w-5" />
                          <span className="text-sm">Telegram</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Свяжитесь со мной
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">
                    Отправить заявку
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? "border-destructive" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={formErrors.phone ? "border-destructive" : ""}
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-destructive mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? "border-destructive" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="personalData"
                          checked={consents.personalData}
                          onCheckedChange={(checked) =>
                            setConsents((prev) => ({
                              ...prev,
                              personalData: checked as boolean,
                            }))
                          }
                        />
                        <Label
                          htmlFor="personalData"
                          className="text-sm leading-relaxed cursor-pointer"
                        >
                          Я даю согласие на обработку моих персональных данных
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Icon
                            name="Loader2"
                            className="mr-2 h-4 w-4 animate-spin"
                          />
                          Отправка...
                        </>
                      ) : (
                        <>
                          Отправить заявку
                          <Icon name="Send" className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-6 md:py-8 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Scale" className="h-5 w-5 text-accent" />
              <span className="font-semibold">Адвокат Мушовец А.Г.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground text-center">
              <Link to="/privacy" className="hover:text-accent transition">
                Политика конфиденциальности
              </Link>
              <Link to="/confidentiality" className="hover:text-accent transition">
                Соглашение о конфиденциальности
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Все права защищены
            </p>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
};

export default Index;
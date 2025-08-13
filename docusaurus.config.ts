import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const path = require('path');

const config: Config = {
  title: 'Agile Tribe',
  tagline: 'How to write good code, and what counts in enterprise software development.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://agiletribe.purplehillsbooks.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Purple Hills Books', // Usually your GitHub org/user name.
  projectName: 'agiletribe', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/agiletribe50.png',
    navbar: {
      title: 'Agile Tribe',
      logo: {
        alt: 'My Site Logo',
        src: 'img/agiletribe50.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Reference',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Reference',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/search?q=agilepro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/agilepro/software-craftsmanship',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Purple Hills Books.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'json'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    path.resolve(__dirname, './node_modules/docusaurus-lunr-search/'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/2011/09/29/1-dont-make-content-free-comments/',
            to: '/docs/Coding/Syntax Conventions/content-free-comments',
          },
          {
            from: '/2011/09/30/2-good-book-clean-code/',
            to: '/docs/clean-code-book',
          },
          {
            from: '/2011/10/01/3-exception-catch-blocks/',
            to: '/docs/Error Handling/Implementation/exception-catch-blocks',
          },
          {
            from: '/2011/10/02/4-avoiding-broken-builds/',
            to: '/docs/Management/Build/avoid-broken-build',
          },
          {
            from: '/2011/10/03/5-avoiding-bugs-caused-by-multiple-programmers/',
            to: '/docs/Management/Source Management/avoiding-multiple-coder-bugs',
          },
          {
            from: '/2011/10/04/6-team-member-obligations/',
            to: '/docs/Management/developer-obligations',
          },
          {
            from: '/2011/10/05/7-functions-returning-collections-should-never-return-null/',
            to: '/docs/Coding/Optimization/collection-functions-never-null',
          },
          {
            from: '/2011/10/06/8-the-go-parameter/',
            to: '/docs/Protocols/go-parameter',
          },
          {
            from: '/2011/10/08/9-avoid-big-bang-changes/',
            to: '/docs/Management/avoid-big-bang-changes',
          },
          {
            from: '/2011/10/10/10-indicate-what-happens-when-function-cant-do-what-it-is-asked-to-do/',
            to: '/docs/Error Handling/Implementation/indicate-method-failure',
          },
          {
            from: '/2011/10/12/11-more-on-encoding/',
            to: '/docs/Protocols/encoding',
          },
          {
            from: '/2011/10/14/12-context-path-and-browser-redirecting/',
            to: '/docs/Protocols/browser-redirection',
          },
          {
            from: '/2011/10/16/working-around-javas-ssl-limitations/',
            to: '/docs/Protocols/java-ssl-limitations',
          },
          {
            from: '/2011/10/16/13-always-replicate-fix-to-the-trunk/',
            to: '/docs/Management/Source Management/replicate-fix-to-trunk',
          },
          {
            from: '/2011/10/18/14-never-catch-and-continue/',
            to: '/docs/Error Handling/never-catch-and-continue',
          },
          {
            from: '/2011/10/20/15-branch-handling-with-fixes/',
            to: '/docs/Management/Source Management/branch-handling-with-fixes',
          },
          {
            from: '/2011/10/25/16-avoid-overloading-methods/',
            to: '/docs/Coding/Syntax Conventions/dont-overload-methods',
          },
          {
            from: '/2011/10/26/17-program-logic-error/',
            to: '/docs/Error Handling/program-logic-error',
          },
          {
            from: '/2011/10/27/18-dont-use-tab-characters/',
            to: '/docs/Coding/Syntax Conventions/tabs-are-evil',
          },
          {
            from: '/2011/10/29/19-reduce-cognitive-load/',
            to: '/docs/Coding/Optimization/reduce-cognitive-load',
          },
          {
            from: '/2011/10/31/20-dont-document-deprecated-code/',
            to: '/docs/Coding/Syntax Conventions/dont-doc-deprecated-code',
          },
          {
            from: '/2011/11/01/21-avoid-ternary-conditional-operator/',
            to: '/docs/Coding/Syntax Conventions/avoid-ternary-operator',
          },
          {
            from: '/2011/11/02/22-avoid-multi-purpose-methods/',
            to: '/docs/Coding/Syntax Conventions/avoid-multi-purpose-methods',
          },
          {
            from: '/2011/11/03/23-utf-8-encoding/',
            to: '/docs/Coding/Syntax Conventions/utf-8',
          },
          {
            from: '/2011/11/19/sprinkling-trim-through-the-code/',
            to: '/docs/Coding/Optimization/usage-of-trim',
          },
          {
            from: '/2011/12/20/never-convert-exception-to-string-before-display-time/',
            to: '/docs/Error Handling/Implementation/never-convert-exception-to-string',
          },
          {
            from: '/2011/12/31/waterfall-method-fails-to-account-for-unseen-benefits/',
            to: '/docs/Management/Agile/waterfall-fails-benefits',
          },
          {
            from: '/2012/01/05/installer-design-principles/',
            to: '/docs/Design/installer-design-principles',
          },
          {
            from: '/2012/01/28/learning-to-iterate/',
            to: '/docs/Management/Agile/learning-to-iterate',
          },
          {
            from: '/2012/01/29/all-or-nothing-is-a-poor-planning-technique/',
            to: '/docs/Management/all-or-nothing',
          },
          {
            from: '/2012/01/31/reading-between-the-lines/',
            to: '/docs/Management/lines-as-measure-of-done',
          },
          {
            from: '/2012/02/21/poor-error-msg-missing-context/',
            to: '/docs/Error Handling/Examples/missing-context',
          },
          {
            from: '/2012/03/01/the-perfect-development-center/',
            to: '/docs/Management/perfect-dev-environment',
          },
          {
            from: '/2012/03/23/26-never-suppress-warnings/',
            to: '/docs/Management/Build/never-suppress-warnings',
          },
          {
            from: '/2012/03/23/27-a-proper-module-does-not-need-a-config-file/',
            to: '/docs/Coding/Optimization/modules-and-configuration',
          },
          {
            from: '/2012/03/26/xml-schema-validation-or-not/',
            to: '/docs/Protocols/xml-validation',
          },
          {
            from: '/2012/03/28/the-error-message-is-the-documentation/',
            to: '/docs/Error Handling/error-message-is-documentation',
          },
          {
            from: '/2012/03/28/hating-splash-screens/',
            to: '/docs/Design/Usability/splash-screens',
          },
          {
            from: '/2012/03/31/usability-is-not-independent-of-programming/',
            to: '/docs/Design/Usability/usability-and-programming',
          },
          {
            from: '/2012/04/02/26-dont-add-methods-and-classes-that-you-dont-need/',
            to: '/docs/Coding/Optimization/unnecessary-classes-and-methods',
          },
          {
            from: '/2012/04/05/two-is-not-better-than-one/',
            to: '/docs/Design/two-not-better-than-one',
          },
          {
            from: '/2012/04/14/27-dont-declare-variables-at-the-top/',
            to: '/docs/Coding/Syntax Conventions/variables-at-the-top',
          },
          {
            from: '/2012/04/17/28-avoid-test-script-fever/',
            to: '/docs/Testing/test-script-fever',
          },
          {
            from: '/2012/04/23/dont-fear-rewriting-new-code/',
            to: '/docs/Management/dont-fear-rewrite',
          },
          {
            from: '/2012/04/30/more-complex-code-need-agile-approach-more/',
            to: '/docs/Management/Agile/complex-projects-need-agile-more',
          },
          {
            from: '/2012/05/08/growing-software-like-a-plant/',
            to: '/docs/Management/Agile/growing-software',
          },
          {
            from: '/2012/05/08/partial-agile-no-such-thing/',
            to: '/docs/Management/Agile/partial-agile',
          },
          {
            from: '/2012/05/17/classic-date-drift-case-study/',
            to: '/docs/Management/date-drift',
          },
          {
            from: '/2012/06/12/securing-against-cross-site-request-forgery/',
            to: '/docs/Protocols/cross-site-request-forgery',
          },
          {
            from: '/2012/06/21/appropriate-technology-for-ui/',
            to: '/docs/Design/Usability/appropriate-tech-for-ui',
          },
          {
            from: '/2012/07/06/29-eliminate-dead-code/',
            to: '/docs/Coding/Optimization/eliminate-dead-code',
          },
          {
            from: '/2012/07/25/configuring-date-format/',
            to: '/docs/Coding/Dates and Time/date-formatting',
          },
          {
            from: '/2012/07/25/module-initialization/',
            to: '/docs/Design/proper-module-initialization',
          },
          {
            from: '/2012/08/13/documentation-and-legal-contracts/',
            to: '/docs/Documentation/write-docs-not-contracts',
          },
          {
            from: '/2012/08/17/avoid-session-variable-abuse/',
            to: '/docs/Design/session-variable-usage',
          },
          {
            from: '/2012/08/21/not-all-bugs-deserve-the-same-handling/',
            to: '/docs/Management/not-all-bugs-handled-same',
          },
          {
            from: '/2012/08/23/waste-asking-whether-to-fix-a-bug/',
            to: '/docs/Management/waste-of-asking-whether-to-fix',
          },
          {
            from: '/2012/10/02/keep-javadoc-with-java-source/',
            to: '/docs/Documentation/doc-by-developers',
          },
          {
            from: '/2012/10/10/is-the-ui-team-broken/',
            to: '/docs/Design/Usability/respond-to-users',
          },
          {
            from: '/2012/10/14/use-realistic-user-scenarios/',
            to: '/docs/Testing/realistic-user-scenarios#a-realistic-scenario',
          },
          {
            from: '/2012/10/14/proper-module-initialization/',
            to: '/docs/Design/proper-module-initialization',
          },
          {
            from: '/2012/10/14/factor-expensive-expressions-out-of-loops/',
            to: '/docs/Coding/Optimization/factor-expensive-statements-out',
          },
          {
            from: '/2012/10/21/trasparency-advantage/',
            to: '/docs/Design/transparency',
          },
          {
            from: '/2012/10/23/email-testing-mode/',
            to: '/docs/Testing/email-testing-mode',
          },
          {
            from: '/2012/11/01/we-dont-need-programmers-we-only-need-designers/',
            to: '/docs/Design/programming-is-design',
          },
          {
            from: '/2012/11/14/quest-for-stability/',
            to: '/docs/Design/quest-for-stability',
          },
          {
            from: '/2012/11/23/the-only-class-you-need-for-csv-files/',
            to: '/docs/Coding/Examples/class-for-csv',
          },
          {
            from: '/2012/11/25/dont-disable-ui-elements/',
            to: '/docs/Design/Usability/dont-disable-ui-elements',
          },
          {
            from: '/2012/12/01/sso-what-is-it/',
            to: '/docs/Protocols/what-is-sso',
          },
          {
            from: '/2012/12/02/keep-it-simple-factory/',
            to: '/docs/Coding/Optimization/keep-it-simple-factory',
          },
          {
            from: '/2012/12/08/email-address-is-your-id/',
            to: '/docs/Protocols/email-is-your-id',
          },
          {
            from: '/2012/12/31/eliminate-exceptional-cases-before-the-main-logic/',
            to: '/docs/Coding/Optimization/test-exceptional-conditions-first',
          },
          {
            from: '/2013/01/03/sort-include-statements-in-alphabetical-order/',
            to: '/docs/Coding/Syntax Conventions/sort-import-statements',
          },
          {
            from: '/2013/01/14/timers-common-misunderstandings/',
            to: '/docs/Coding/Dates and Time/timer-misconceptions',
          },
          {
            from: '/2013/01/22/ui-guideline-resources/',
            to: '/docs/Design/Usability/usability-guidelines',
          },
          {
            from: '/2013/02/12/dont-suffer-poor-names/',
            to: '/docs/Coding/Syntax Conventions/name-well',
          },
          {
            from: '/2013/02/13/essential-cvs/',
            to: '/docs/Management/Source Management/cvs-essentials',
          },
          {
            from: '/2013/02/14/the-purpose-of-error-reporting/',
            to: '/docs/Error Handling/purpose-of-error-reporting',
          },
          {
            from: '/2013/02/15/gathering-error-report-information/',
            to: '/docs/Error Handling/gathering-error-information',
          },
          {
            from: '/2013/02/20/catch-and-continue-apache-chemistry/',
            to: '/docs/Error Handling/Examples/apache-chemestry',
          },
          {
            from: '/2013/02/21/exceptions-speak-about-the-context-they-are-thrown-from/',
            to: '/docs/Error Handling/Message Quality/message-is-about-context',
          },
          {
            from: '/2013/02/22/26-hints-for-agile-software-development/',
            to: '/docs/Management/Agile/agile-26-hints',
          },
          {
            from: '/2013/02/23/file-path-manipulation/',
            to: '/docs/Coding/file-path-manipulation',
          },
          {
            from: '/2013/03/06/improving-the-code-through-installation-manual-analysis/',
            to: '/docs/Design/installation-manual-analysis',
          },
          {
            from: '/2013/03/15/letter-to-someone-considering-switching-from-waterfall-to-agile/',
            to: '/docs/Management/Agile/waterfall-to-agile',
          },
          {
            from: '/2013/03/26/usability-means-well-behaved-even-when-the-user-isnt/',
            to: '/docs/Design/Usability/usability-is-well-behaved',
          },
          {
            from: '/2013/04/04/method-exception-signature/',
            to: '/docs/Error Handling/Implementation/method-exception-signature',
          },
          {
            from: '/2013/05/30/usability-means-not-jumping-through-hoops/',
            to: '/docs/Design/Usability/jumping-through-hoops',
          },
          {
            from: '/2013/06/12/discuss-each-bug-report-only-once/',
            to: '/docs/Management/discuss-bug-once',
          },
          {
            from: '/2013/06/14/always-use-a-brace-even-if-not-needed/',
            to: '/docs/Coding/Syntax Conventions/always-use-brace',
          },
          {
            from: '/2013/07/16/designing-the-build/',
            to: '/docs/Management/Build/proper-build-goals',
          },
          {
            from: '/2013/07/17/xml-should-be-streamed-and-never-stringed/',
            to: '/docs/Coding/Streams vs Strings/streaming-xml',
          },
          {
            from: '/2013/07/18/surprising-outrageous-file-handling/',
            to: '/docs/Coding/Streams vs Strings/surprising-file-handling',
          },
          {
            from: '/2013/08/24/error-message-should-be-clear-plain-and-direct/',
            to: '/docs/Error Handling/Message Quality/clear-plain-direct',
          },
          {
            from: '/2013/10/08/dont-abuse-singleton-pattern/',
            to: '/docs/Coding/Optimization/singleton',
          },
          {
            from: '/2014/01/07/proper-stream-patterns/',
            to: '/docs/Coding/Streams vs Strings/proper-stream-patterns',
          },
          {
            from: '/2014/01/13/robust-web-application-initialization/',
            to: '/docs/Design/robust-application-init',
          },
          {
            from: '/2014/01/17/storing-date-values-in-files/',
            to: '/docs/Coding/Dates and Time/storing-dates-in-files',
          },
          {
            from: '/2014/01/25/not-so-easychair-hints/',
            to: '/docs/X Miscellaneous/easy-chair-hints',
          },
          {
            from: '/2014/02/07/public-or-private-member-variables/',
            to: '/docs/Coding/Syntax Conventions/public-or-private-member',
          },
          {
            from: '/2014/02/08/never-use-stringtokenizer/',
            to: '/docs/Coding/Examples/string-tokenizer',
          },
          {
            from: '/2014/02/22/choice-in-style-of-debug-code/',
            to: '/docs/Coding/debugging-style',
          },
          {
            from: '/2014/04/09/security-absolutism-is-the-enemy-of-security-improvement/',
            to: '/docs/Design/security-vs-improvement',
          },
          {
            from: '/2014/05/05/correctly-converting-integer-to-string/',
            to: '/docs/Coding/Optimization/converting-int-to-string',
          },
          {
            from: '/2014/05/14/always-test-the-software-running-in-the-same-way-that-customer-will-run-it/',
            to: '/docs/Testing/test-like-real-user',
          },
          {
            from: '/2014/07/26/latex-what-i-wish-part-1/',
            to: '/docs/Documentation/what-i-wish-i-had-known',
          },
          {
            from: '/2014/09/30/oops-something-failed-is-not-acceptable-error-message/',
            to: '/docs/Error Handling/Message Quality/oops-something-failed',
          },
          {
            from: '/2014/10/03/estimations-the-eternal-software-problem/',
            to: '/docs/Management/development-estimates',
          },
          {
            from: '/2014/10/06/usability-is-like-the-flavor-of-a-meal/',
            to: '/docs/Design/Usability/usability-is-flavor',
          },
          {
            from: '/2014/10/20/svn-essentials/',
            to: '/docs/Management/Source Management/svn-essentials-1',
          },
          {
            from: '/2014/11/17/svn-essentials-2/',
            to: '/docs/Management/Source Management/svn-essentials-2',
          },
          {
            from: '/2015/01/02/java-servlet-url-parsing-best-practice/',
            to: '/docs/Protocols/servlet-url-parsing',
          },
          {
            from: '/2015/01/09/content-free-documentation/',
            to: '/docs/Design/content-free-documentation',
          },
          {
            from: '/2015/01/11/making-an-ebook-with-latex/',
            to: '/docs/Documentation/ebook-from-latex',
          },
          {
            from: '/2015/01/15/parsing-parameters-angularjs-tip/',
            to: '/docs/Coding/Angular/passing-parameters',
          },
          {
            from: '/2015/01/16/reflecting-state-in-the-url-angular-js-tip/',
            to: '/docs/Coding/Angular/reflecting-state-into-url',
          },
          {
            from: '/2015/01/16/getting-selfie-links-to-work-angularjs-tips/',
            to: '/docs/Coding/Angular/selfie-links',
          },
          {
            from: '/2015/04/07/adding-unicode-characters-to-latex-documents/',
            to: '/docs/Documentation/unicode-in-latex',
          },
          {
            from: '/2015/04/21/what-an-author-needs-to-know-about-latex/',
            to: '/docs/Documentation/latex-for-authors',
          },
          {
            from: '/2015/06/10/jsonrest-api-handling-dates/',
            to: '/docs/Coding/Dates and Time/handling-dates',
          },
          {
            from: '/2015/06/11/create-on-update-pattern-for-angularjs-applications/',
            to: '/docs/Protocols/create-on-update-pattern',
          },
          {
            from: '/2015/08/17/outrageous-strange-cross-site-security/',
            to: '/docs/Protocols/cross-site-complications',
          },
          {
            from: '/2015/08/27/avoid-unnecessary-nesting/',
            to: '/docs/Coding/Syntax Conventions/avoid-deep-nesting-2',
          },
          {
            from: '/2015/09/16/json-rest-api-exception-handling/',
            to: '/docs/Protocols/error-response',
          },
          {
            from: '/2015/09/21/specifying-business-hours/',
            to: '/docs/Coding/Dates and Time/business-hours',
          },
          {
            from: '/2015/10/29/dont-fear-the-lowly-static-method/',
            to: '/docs/Coding/Syntax Conventions/lowly-static-methods',
          },
          {
            from: '/2015/11/23/dont-use-url-encoding-in-rest-path-tokens/',
            to: '/docs/Protocols/avoid-url-encoding-in-path',
          },
          {
            from: '/2015/12/04/error-first-design-in-jsonrestangularjs-integration/',
            to: '/docs/Design/error-first-design',
          },
          {
            from: '/2015/12/12/error-messages-should-be-very-literal/',
            to: '/docs/Error Handling/Message Quality/literal-error-messages',
          },
          {
            from: '/2015/12/21/source-management-7-rules/',
            to: '/docs/Management/Source Management/source-management-seven-rules',
          },
          {
            from: '/2015/12/26/never-leave-commented-code-in-the-source/',
            to: '/docs/Coding/Syntax Conventions/eliminate-commented-code',
          },
          {
            from: '/2016/02/19/incremental-development/',
            to: '/docs/Management/incremental-development',
          },
          {
            from: '/2016/02/22/counting-source-lines/',
            to: '/docs/Management/counting-source-lines',
          },
          {
            from: '/2016/02/23/httpservletrequest-path-decoding/',
            to: '/docs/Protocols/httpservletrequest-path-decoding',
          },
          {
            from: '/2016/03/05/dont-baby-your-builds/',
            to: '/docs/Management/Build/dont-baby-builds',
          },
          {
            from: '/2016/03/07/brainless-getters-setters-are-a-waste/',
            to: '/docs/Coding/Syntax Conventions/brainless-getters-and-setters',
          },
          {
            from: '/2016/03/09/constant-abuse/',
            to: '/docs/Coding/Syntax Conventions/constant-abuse-1',
          },
          {
            from: '/2016/03/10/resetting-passwords-the-right-way/',
            to: '/docs/Protocols/resetting-passwords',
          },
          {
            from: '/2016/03/14/two-kinds-of-exceptions/',
            to: '/docs/Error Handling/two-kinds-of-exceptions',
          },
          {
            from: '/2016/03/16/individual-exception-classes-are-monstrously-overweight/',
            to: '/docs/Error Handling/Implementation/individual-class-problem',
          },
          {
            from: '/2016/03/29/avoid-unnecessary-conditional-nesting/',
            to: '/docs/Coding/Syntax Conventions/avoid-deep-nesting-2',
          },
          {
            from: '/2016/06/01/prefer-json-over-xml-for-data-structures/',
            to: '/docs/Protocols/prefer-json-over-xml',
          },
          {
            from: '/2017/01/07/git-essentials/',
            to: '/docs/Management/Source Management/git-essentials',
          },
          {
            from: '/2017/01/09/answer-question-by-updating-manual/',
            to: '/docs/Management/update-the-manual',
          },
          {
            from: '/2017/03/04/jungles-and-ski-gloves/',
            to: '/docs/Design/jungles-and-ski-gloves',
          },
          {
            from: '/2017/05/18/lots-of-folders-project-more-organized/',
            to: '/docs/Management/folder-organization',
          },
          {
            from: '/2017/06/29/is-non-existence-an-error/',
            to: '/docs/Error Handling/non-existence-error',
          },
          {
            from: '/2017/07/03/when-are-best-practices-less-than-best/',
            to: '/docs/Design/less-than-best-practice',
          },
          {
            from: '/2017/07/10/its-ok-to-ship-tests-with-product/',
            to: '/docs/Testing/shipping-test-code',
          },
          {
            from: '/2017/07/12/extreme-precision-programming/',
            to: '/docs/Coding/extreme-precision-programming',
          },
          {
            from: '/2017/07/14/dont-write-insulting-error-messages/',
            to: '/docs/Error Handling/Message Quality/avoid-insulting-messages',
          },
          {
            from: '/2017/07/17/grounding-design-for-the-real-world/',
            to: '/docs/Design/grounding-design',
          },
          {
            from: '/2017/07/24/posthoc-testing-apps-that-send-email/',
            to: '/docs/Testing/posthoc',
          },
          {
            from: '/2017/11/22/abstraction-and-encapsulation/',
            to: '/docs/Design/abstraction-and-encapsulation',
          },
          {
            from: '/2017/11/24/hints-for-ng-options/',
            to: '/docs/Coding/Angular/angular-settings',
          },
          {
            from: '/2017/12/16/the-urge-to-merge/',
            to: '/docs/Management/Source Management/urge-to-merge',
          },
          {
            from: '/2017/12/16/excessive-branch-use-causes-technical-debt-and-increases-risk-of-bugs/',
            to: '/docs/Management/Source Management/excessive-branching',
          },
          {
            from: '/2018/01/04/software-is-clutter-prone/',
            to: '/docs/Coding/Syntax Conventions/battling-clutter',
          },
          {
            from: '/2018/01/29/caching-for-chrome/',
            to: '/docs/Design/chrome-caching',
          },
          {
            from: '/2018/02/01/git-branching/',
            to: '/docs/Management/Source Management/git-branching',
          },
          {
            from: '/2018/04/20/context-error-reporting/',
            to: '/docs/Error Handling/context-error-reporting',
          },
          {
            from: '/2018/05/01/pragmatic-exception-handling/',
            to: '/docs/Error Handling/pragmatic-exception-handling',
          },
          {
            from: '/2018/06/20/git-accented-characters-in-filenames/',
            to: '/docs/Management/Source Management/git-accented-characters',
          },
          {
            from: '/2018/11/14/constant-abuse-2/',
            to: '/docs/Coding/Syntax Conventions/constant-abuse-2',
          },
          {
            from: '/2018/11/27/constants-and-errors/',
            to: '/docs/Error Handling/constants-and-errors',
          },
          {
            from: '/2019/01/05/translatable-error-messages/',
            to: '/docs/Error Handling/Implementation/translatable-error-messages',
          },
          {
            from: '/2019/01/06/json-translatable-error-messages/',
            to: '/docs/Error Handling/Implementation/translatable-messages',
          },
          {
            from: '/2019/01/07/variable-arguments-for-messages/',
            to: '/docs/Error Handling/Implementation/message-arguments',
          },
          {
            from: '/2019/01/08/exception-receiving/',
            to: '/docs/Error Handling/exception-receiving',
          },
          {
            from: '/2019/01/09/ultimate-java-exception-class/',
            to: '/docs/Error Handling/Implementation/ultimate-exception-class',
          },
          {
            from: '/2019/01/10/poor-exception-handling-examples/',
            to: '/docs/Error Handling/Examples/poor-handling-examples',
          },
          {
            from: '/2019/01/11/simple-rule-for-exception/',
            to: '/docs/Error Handling/simple-rule-for-exception',
          },
          {
            from: '/2019/01/15/java-timertask-implementation-pattern/',
            to: '/docs/Coding/Examples/timer-task',
          },
          {
            from: '/2019/01/24/keep-things-the-same/',
            to: '/docs/Design/consistency',
          },
          {
            from: '/2019/02/20/write-bug-reports-to-last/',
            to: '/docs/Management/bug-reports-to-last',
          },
          {
            from: '/2019/05/07/variable-names-key-values/',
            to: '/docs/Coding/variables-key-values',
          },
          {
            from: '/2019/05/11/return-null-or-exception/',
            to: '/docs/Coding/Optimization/null-or-exception',
          },
          {
            from: '/2019/06/06/dont-interview-the-engineer/',
            to: '/docs/Management/interviewing-programmers',
          },
          {
            from: '/2019/10/02/the-magic-of-memfile/',
            to: '/docs/Coding/Examples/memfile',
          },
          {
            from: '/2019/10/09/let-me-save-incomplete-files/',
            to: '/docs/Design/save-incomplete-work',
          },
          {
            from: '/2019/10/18/eliminate-useless-comments/',
            to: '/docs/Coding/useless-comments',
          },
          {
            from: '/2019/11/14/what-is-wrong-with-this-code/',
            to: '/docs/Coding/Examples/what-is-wrong',
          },
          {
            from: '/2020/02/27/safe-api-upgrade/',
            to: '/docs/Protocols/safe-api-upgrade',
          },
          {
            from: '/2020/04/24/dont-erase-wrong-data/',
            to: '/docs/Design/Usability/dont-lose-input',
          },
          {
            from: '/2020/12/31/good-error-messages-can-be-easy/',
            to: '/docs/Error Handling/Message Quality/good-error-messages',
          },
          {
            from: '/2021/02/23/bibtex-what-authors-need-to-know/',
            to: '/docs/Documentation/bibtex',
          },
          {
            from: '/2021/04/08/xml-vs-json-vs-yml/',
            to: '/docs/Protocols/xml-vs-json',
          },
          {
            from: '/2021/05/11/factoring-functionality-who-needs-to-know/',
            to: '/docs/Design/factoring-functionality',
          },
          {
            from: '/2022/11/10/handling-dates/',
            to: '/docs/Coding/Dates and Time/handling-dates',
          },
          {
            from: '/2022/12/03/holographic-testing-technique/',
            to: '/docs/Testing/holographic-testing',
          },
          {
            from: '/2022/12/15/always-catch-the-generic-exception/',
            to: '/docs/Error Handling/catch-base-exception',
          },
          {
            from: '/2022/12/20/dont-use-java-util-optional/',
            to: '/docs/Coding/java-optional',
          },
          {
            from: '/2023/01/16/canonical-execution-error-example/',
            to: '/docs/Error Handling/canonical-error-example',
          },
          {
            from: '/2023/01/17/variable-naming/',
            to: '/docs/Coding/Syntax Conventions/variable-naming',
          },
          {
            from: '/2023/01/17/code-copy-guidelines/',
            to: '/docs/Coding/code-copy',
          },
          {
            from: '/2023/01/18/numbered-error-messages-do-not-work/',
            to: '/docs/Error Handling/Message Quality/numbered-error-messages',
          },
          {
            from: '/2023/01/18/error-message-video/',
            to: '/docs/Error Handling/video-of-error-handling',
          },
          {
            from: '/2023/04/10/code-only-what-you-need/',
            to: '/docs/Design/code-only-what-you-need',
          },
          {
            from: '/2023/07/01/where-should-constants-be-defined/',
            to: '/docs/Coding/Syntax Conventions/constant-location',
          },
          {
            from: '/2023/07/03/lambda-vs-loop-in-java/',
            to: '/docs/Coding/Optimization/lambda-vs-loop',
          },
          {
            from: '/2023/07/04/when-getters-and-setters-are-not-needed/',
            to: '/docs/Coding/Syntax Conventions/getters-and-setters',
          },
          {
            from: '/2023/07/12/time-bombs/',
            to: '/docs/Error Handling/time-bombs',
          },
          {
            from: '/2023/07/13/say-no-to-checked-exceptions/',
            to: '/docs/Coding/checked-exceptions/',
          },
          {
            from: '/2023/11/24/maintain-consistent-paradigm/',
            to: '/docs/Design/maintain-consistent-paradigm',
          },
          {
            from: '/2023/12/21/null-value-in-json/',
            to: '/docs/Coding/null-value',
          },
          {
            from: '/2024/02/11/past-fads-of-java/',
            to: '/docs/past-fads-of-java',
          },
          {
            from: '/2011/09/04/goals/',
            to: '/docs/intro',
          },
        ],
      },
    ],
  ],
};

export default config;
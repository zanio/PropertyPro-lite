"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyEmail = void 0;

var verifyEmail = function verifyEmail(data) {
  return "\n    <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html>\n\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n  <!-- Facebook sharing information tags -->\n  <meta property=\"og:title\" content=\"Verify Your Email\">\n  <title>Verify Your Email</title>\n  <style type=\"text/css\">\n    #outlook a{\n        padding:0;\n      }\n      body{\n        width:100% !important;\n      }\n      .ReadMsgBody{\n        width:100%;\n      }\n      .ExternalClass{\n        width:100%;\n      }\n      body{\n        -webkit-text-size-adjust:none;\n      }\n      body{\n        margin:0;\n        padding:0;\n      }\n      img{\n        border:0;\n        height:auto;\n        line-height:100%;\n        outline:none;\n        text-decoration:none;\n      }\n      table td{\n        border-collapse:collapse;\n      }\n      #backgroundTable{\n        height:100% !important;\n        margin:0;\n        padding:0;\n        width:100% !important;\n      }\n    /*\n    @tab Page\n    @section background color\n    @tip Set the background color for your email. You may want to choose one that matches your company's branding.\n    @theme page\n    */\n      body,#backgroundTable{\n        /*@editable*/background-color:#FAFAFA;\n      }\n    /*\n    @tab Page\n    @section email border\n    @tip Set the border for your email.\n    */\n      #templateContainer{\n        /*@editable*/border:1px none #DDDDDD;\n      }\n    /*\n    @tab Page\n    @section heading 1\n    @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.\n    @style heading 1\n    */\n      h1,.h1{\n        /*@editable*/color:#202020;\n        display:block;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:24px;\n        /*@editable*/font-weight:bold;\n        /*@editable*/line-height:100%;\n        margin-top:20px;\n        margin-right:0;\n        margin-bottom:20px;\n        margin-left:0;\n        /*@editable*/text-align:center;\n      }\n    /*\n    @tab Page\n    @section heading 2\n    @tip Set the styling for all second-level headings in your emails.\n    @style heading 2\n    */\n      h2,.h2{\n        /*@editable*/color:#202020;\n        display:block;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:30px;\n        /*@editable*/font-weight:bold;\n        /*@editable*/line-height:100%;\n        margin-top:0;\n        margin-right:0;\n        margin-bottom:10px;\n        margin-left:0;\n        /*@editable*/text-align:center;\n      }\n    /*\n    @tab Page\n    @section heading 3\n    @tip Set the styling for all third-level headings in your emails.\n    @style heading 3\n    */\n      h3,.h3{\n        /*@editable*/color:#202020;\n        display:block;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:26px;\n        /*@editable*/font-weight:bold;\n        /*@editable*/line-height:100%;\n        margin-top:0;\n        margin-right:0;\n        margin-bottom:10px;\n        margin-left:0;\n        /*@editable*/text-align:center;\n      }\n    /*\n    @tab Page\n    @section heading 4\n    @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.\n    @style heading 4\n    */\n      h4,.h4{\n        /*@editable*/color:#202020;\n        display:block;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:22px;\n        /*@editable*/font-weight:bold;\n        /*@editable*/line-height:100%;\n        margin-top:0;\n        margin-right:0;\n        margin-bottom:10px;\n        margin-left:0;\n        /*@editable*/text-align:center;\n      }\n    /*\n    @tab Header\n    @section preheader style\n    @tip Set the background color for your email's preheader area.\n    @theme page\n    */\n      #templatePreheader{\n        /*@editable*/background-color:#FAFAFA;\n      }\n    /*\n    @tab Header\n    @section preheader text\n    @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.\n    */\n      .preheaderContent div{\n        /*@editable*/color:#505050;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:10px;\n        /*@editable*/line-height:100%;\n        /*@editable*/text-align:left;\n      }\n    /*\n    @tab Header\n    @section preheader link\n    @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.\n    */\n      .preheaderContent div a:link,.preheaderContent div a:visited,.preheaderContent div a .yshortcuts {\n        /*@editable*/color:#336699;\n        /*@editable*/font-weight:normal;\n        /*@editable*/text-decoration:underline;\n      }\n      .preheaderContent img{\n        display:inline;\n        height:auto;\n        margin-bottom:10px;\n        max-width:280px;\n      }\n    /*\n    @tab Header\n    @section header style\n    @tip Set the background color and border for your email's header area.\n    @theme header\n    */\n      #templateHeader{\n        /*@editable*/background-color:#FFFFFF;\n        /*@editable*/border-bottom:0;\n      }\n    /*\n    @tab Header\n    @section header text\n    @tip Set the styling for your email's header text. Choose a size and color that is easy to read.\n    */\n      .headerContent{\n        /*@editable*/color:#202020;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:34px;\n        /*@editable*/font-weight:bold;\n        /*@editable*/line-height:100%;\n        /*@editable*/padding:0;\n        /*@editable*/text-align:left;\n        /*@editable*/vertical-align:middle;\n        background-color: #FAFAFA;\n          padding-bottom: 14px;\n      }\n    /*\n    @tab Header\n    @section header link\n    @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.\n    */\n      .headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {\n        /*@editable*/color:#336699;\n        /*@editable*/font-weight:normal;\n        /*@editable*/text-decoration:underline;\n      }\n      #headerImage{\n        height:auto;\n        max-width:400px !important;\n      }\n    /*\n    @tab Body\n    @section body style\n    @tip Set the background color for your email's body area.\n    */\n      #templateContainer,.bodyContent{\n        /*@editable*/background-color:#FFFFFF;\n      }\n    /*\n    @tab Body\n    @section body text\n    @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.\n    @theme main\n    */\n      .bodyContent div{\n        /*@editable*/color:#505050;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:14px;\n        /*@editable*/line-height:150%;\n        /*@editable*/text-align:left;\n      }\n    /*\n    @tab Body\n    @section body link\n    @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.\n    */\n      .bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts {\n        /*@editable*/color:#336699;\n        /*@editable*/font-weight:normal;\n        /*@editable*/text-decoration:underline;\n      }\n      .bodyContent img{\n        display:inline;\n        height:auto;\n        margin-bottom:10px;\n        max-width:280px;\n      }\n    /*\n    @tab Footer\n    @section footer style\n    @tip Set the background color and top border for your email's footer area.\n    @theme footer\n    */\n      #templateFooter{\n        /*@editable*/background-color:#FFFFFF;\n        /*@editable*/border-top:0;\n      }\n    /*\n    @tab Footer\n    @section footer text\n    @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.\n    @theme footer\n    */\n      .footerContent {\n        background-color: #fafafa;\n      }\n      .footerContent div{\n        /*@editable*/color:#707070;\n        /*@editable*/font-family:Arial;\n        /*@editable*/font-size:11px;\n        /*@editable*/line-height:150%;\n        /*@editable*/text-align:left;\n      }\n    /*\n    @tab Footer\n    @section footer link\n    @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.\n    */\n      .footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts {\n        /*@editable*/color:#336699;\n        /*@editable*/font-weight:normal;\n        /*@editable*/text-decoration:underline;\n      }\n      .footerContent img{\n        display:inline;\n      }\n    /*\n    @tab Footer\n    @section social bar style\n    @tip Set the background color and border for your email's footer social bar.\n    @theme footer\n    */\n      #social{\n        /*@editable*/background-color:#FAFAFA;\n        /*@editable*/border:0;\n      }\n    /*\n    @tab Footer\n    @section social bar style\n    @tip Set the background color and border for your email's footer social bar.\n    */\n      #social div{\n        /*@editable*/text-align:left;\n      }\n    /*\n    @tab Footer\n    @section utility bar style\n    @tip Set the background color and border for your email's footer utility bar.\n    @theme footer\n    */\n      #utility{\n        /*@editable*/background-color:#FFFFFF;\n        /*@editable*/border:0;\n      }\n    /*\n    @tab Footer\n    @section utility bar style\n    @tip Set the background color and border for your email's footer utility bar.\n    */\n      #utility div{\n        /*@editable*/text-align:left;\n      }\n      #monkeyRewards img{\n        display:inline;\n        height:auto;\n        max-width:280px;\n      }\n  \n  \n    /*\n    ATAVIST CUSTOM STYLES \n     */\n  \n    .buttonText {\n      color: #4A90E2;\n      text-decoration: none;\n      font-weight: normal;\n      display: block;\n      border: 2px solid #585858;\n      padding: 10px 80px;\n      font-family: Arial;\n    }\n  \n    #supportSection, .supportContent {\n      background-color: white;\n      font-family: arial;\n      font-size: 12px;\n      border-top: 1px solid #e4e4e4;\n    }\n  \n    .bodyContent table {\n      padding-bottom: 10px;\n    }\n  \n  \n    .footerContent p {\n      margin: 0;\n      margin-top: 2px;\n    }\n  \n    .headerContent.centeredWithBackground {\n      background-color: #F4EEE2;\n      text-align: center;\n      padding-top: 20px;\n      padding-bottom: 20px;\n    }\n        \n     @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n            h1 {\n                font-size: 40px !important;\n            }\n            \n            .content {\n                font-size: 22px !important;\n            }\n            \n            .bodyContent p {\n                font-size: 22px !important;\n            }\n            \n            .buttonText {\n                font-size: 22px !important;\n            }\n            \n            p {\n                \n                font-size: 16px !important;\n                \n            }\n            \n            .footerContent p {\n                padding-left: 5px !important;\n            }\n            \n            .mainContainer {\n                padding-bottom: 0 !important;   \n            }\n        }\n  </style>\n</head>\n\n<body leftmargin=\"0\" marginwidth=\"0\" topmargin=\"0\" marginheight=\"0\" offset=\"0\" style=\"width:100% ;-webkit-text-size-adjust:none;margin:0;padding:0;background-color:#FAFAFA;\">\n  <center>\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" id=\"backgroundTable\" style=\"height:100% ;margin:0;padding:0;width:100% ;background-color:#FAFAFA;\">\n      <tr>\n        <td align=\"center\" valign=\"top\" style=\"border-collapse:collapse;\">\n          <!-- // Begin Template Preheader \\ -->\n          <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"450\" id=\"templatePreheader\" style=\"background-color:#FAFAFA;\">\n            <tr>\n              <td valign=\"top\" class=\"preheaderContent\" style=\"border-collapse:collapse;\">\n                <!-- // Begin Module: Standard Preheader \\ -->\n                <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"100%\">\n                  <tr>\n                    <td valign=\"top\" style=\"border-collapse:collapse;\">\n                      <div mc:edit=\"std_preheader_content\">\n                                                     Welcome ".concat(data.first_name, ", We are glad to have you, but before you start posting quickly verify your email\n                                                  </div>\n                                                 \n                    </td>\n                  </tr>\n                </table>\n                <!-- // End Module: Standard Preheader \\ -->\n              </td>\n            </tr>\n          </table>\n          <!-- // End Template Preheader \\ -->\n          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" id=\"templateContainer\" style=\"border:1px none #DDDDDD;background-color:#FFFFFF;\">\n            <tr>\n              <td align=\"center\" valign=\"top\" style=\"border-collapse:collapse;\">\n                <!-- // Begin Template Header \\ -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" id=\"templateHeader\" style=\"background-color:#FFFFFF;border-bottom:0;\">\n                  <tr>\n                    <td class=\"headerContent centeredWithBackground\" style=\"border-collapse:collapse;color:#202020;font-family:Arial;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#15254F;padding-bottom:20px;padding-top:20px;\">\n                      <!-- // Begin Module: Standard Header Image \\ -->\n                      <img width=\"130\" src=\"https://res.cloudinary.com/dhqugypmq/image/upload/v1562679922/PropertyPro-lite_kqkgie.png\" style=\"width:130px;max-width:130px;border:0;height:auto;line-height:100%;outline:none;text-decoration:none;\" id=\"headerImage campaign-icon\">\n                      <!-- // End Module: Standard Header Image \\ -->\n                    </td>\n                  </tr>\n                </table>\n                <!-- // End Template Header \\ -->\n              </td>\n            </tr>\n            <tr>\n              <td align=\"center\" valign=\"top\" style=\"border-collapse:collapse;\">\n                <!-- // Begin Template Body \\ -->\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" id=\"templateBody\">\n                  <tr>\n                    <td valign=\"top\" class=\"bodyContent\" style=\"border-collapse:collapse;background-color:#FFFFFF;\">\n                      <!-- // Begin Module: Standard Content \\ -->\n                      <table border=\"0\" cellpadding=\"20\" cellspacing=\"0\" width=\"100%\" style=\"padding-bottom:10px;\">\n                        <tr>\n                          <td valign=\"top\" style=\"padding-bottom:1rem;border-collapse:collapse;\" class=\"mainContainer\">\n                            <div style=\"text-align:center;color:#505050;font-family:Arial;font-size:14px;line-height:150%;\">\n                              <h1 class=\"h1\" style=\"color:#202020;display:block;font-family:Arial;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:center;\">Verify Your Email</h1>\n\n                              <!-- <h2 class=\"h2\">Heading 2</h2>\n                                                                <h3 class=\"h3\">Heading 3</h3>\n                                                                <h4 class=\"h4\">Heading 4</h4> -->\n                              <p>Please click the button below to verify your email.</p>\n                            </div>\n                          </td>\n                        </tr>\n                        <tr>\n                          <td align=\"center\" style=\"border-collapse:collapse;\">\n                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding-bottom:10px;\">\n                              <tbody>\n                                <tr align=\"center\">\n                                  <td align=\"center\" valign=\"middle\" style=\"border-collapse:collapse;\">\n                                    <a class=\"buttonText\" href=").concat(data.link, " target=\"_blank\" style=\"color: #4A90E2;text-decoration: none;font-weight: normal;display: block;border: 2px solid #585858;padding: 10px 80px;font-family: Arial;\">Verify</a>\n                                  </td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </td>\n                        </tr>\n                      </table>\n                      <!-- // End Module: Standard Content \\ -->\n                    </td>\n                  </tr>\n                </table>\n                <!-- // End Template Body \\ -->\n              </td>\n            </tr>\n            <tr>\n              <td align=\"center\" valign=\"top\" style=\"border-collapse:collapse;\">\n                <!-- // Begin Support Section \\ -->\n                <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"450\" id=\"supportSection\" style=\"background-color:white;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;\">\n                  <tr>\n                    <td valign=\"top\" class=\"supportContent\" style=\"border-collapse:collapse;background-color:white;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;\">\n                      <!-- // Begin Module: Standard Footer \\ -->\n                      <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"100%\">\n                        <tr>\n                          <td valign=\"top\" width=\"100%\" style=\"border-collapse:collapse;\">\n                            <br>\n                            <div style=\"text-align: center; color: #c9c9c9;\">\n                              <p>Questions? Get your answers here:&nbsp;\n                                <a href=\"http://help.atavist.com\" style=\"color:#4a90e2;font-weight:normal;text-decoration:underline; font-size: 12px;\">Help Center</a>.</p>\n                            </div>\n                            <br>\n                          </td>\n                        </tr>\n                      </table>\n                      <!-- // End Module: Standard Footer \\ -->\n                    </td>\n                  </tr>\n                </table>\n                <!-- // Begin Support Section \\ -->\n              </td>\n            </tr>\n            <tr>\n              <td align=\"center\" valign=\"top\" style=\"border-collapse:collapse;\">\n                <!-- // Begin Template Footer \\ -->\n                <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"450\" id=\"templateFooter\" style=\"background-color:#FFFFFF;border-top:0;\">\n                  <tr>\n                    <td valign=\"top\" class=\"footerContent\" style=\"padding-left:0;border-collapse:collapse;background-color:#fafafa;\">\n                      <div style=\"text-align:center;color:#c9c9c9;font-family:Arial;font-size:11px;line-height:150%;\">\n                        <p style=\"text-align:left;margin:0;margin-top:2px;\">Atavist | Brooklyn, New York, 11201 | Copyright \xA9 2015 | All rights reserved</p>\n                      </div>\n                      <!-- // End Module: Standard Footer \\ -->\n                    </td>\n                  </tr>\n                </table>\n                <!-- // End Template Footer \\ -->\n              </td>\n            </tr>\n          </table>\n          <br>\n        </td>\n      </tr>\n    </table>\n  </center>\n</body>\n\n</html>\n    \n    ");
};

exports.verifyEmail = verifyEmail;
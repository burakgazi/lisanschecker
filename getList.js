module.exports = (phantomInstance, params, callback) => {
    phantomInstance
        .open('http://www.tff.org/Default.aspx?pageID=130')
        // Optionally, determine the status of the response
        .status()
        .then(function Yuklendimi(statusCode) {
            console.log('HTTP status code: ', statusCode);
            if (Number(statusCode) >= 400) {
                throw 'Page failed with status: ' + statusCode;
            }
        })
        // Take the screenshot
        // Save the screenshot to a file
        .type('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$txtAd"]', params.ad)
        .type('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$txtSoyad"]', params.soyad)
        .value('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$cmbStatu_index"]', params.lisans) // Amatör ,Profesyönel
        .value('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$f_index"]', params.aktif)  // 1,2
        .click('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$btnSearch3"]')
        .waitForNextPage()
        .then(function results() {
            this
                .evaluate(function SonucKontrol(selector) {
                    const res = $(selector).children().find('tr.GRidRow_TFF_Contents');
                    if ($(res).find('td').length === 1) {
                        return false;
                    }
                    return $(selector).html();
                }, 'table .MasterTable_TFF_Contents').then(function Donelım(result) {
                    phantomInstance.close();
                    return callback(result);
                });
        })
        .catch(function ErrorFunc(err) {
            console.log('Error taking screenshot: ', err);
            return;
        })
    // Always close the Horseman instance, or you might end up with orphaned phantom processes

};
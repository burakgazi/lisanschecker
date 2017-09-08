module.exports = (phantomInstance, params, callback) => {
    phantomInstance
        .open('http://www.tff.org/Default.aspx?pageID=130')
        // Optionally, determine the status of the response
        .status()
        .then(function Yuklendimi(statusCode) {
            if (Number(statusCode) >= 400) {
                throw new Error(`Page failed with status: ${statusCode}`);
            }
        })
        .type('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$txtAd"]', params.ad)
        .type('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$txtSoyad"]', params.soyad)
        .value('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$cmbStatu_index"]', params.lisans || 'P')
        .value('[name="ctl00$MPane$m_130_696_ctnr$m_130_696$f_index"]', params.aktif || 1)
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
            phantomInstance.close();
            return callback(err);;
        })

};